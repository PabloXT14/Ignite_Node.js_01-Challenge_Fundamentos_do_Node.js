import multer from "multer";
import fs from "node:fs";
import { buildRoutePath } from "../utils/build-route-path.js";
import { Database } from "../database/index.js";
import { Task } from '../models/Task.js';
import { AppError } from "../utils/AppError.js";
import { storage } from "../multerConfig.js";
import { converteCSVToJS } from "../../streams/import-csv.js";

const database = new Database();
const uploadCSV = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,// 5MB (tamanho máximo permitido)
  },
  fileFilter: (request, file, callback) => {
    if (file.mimetype !== 'text/csv') {
      callback(new AppError('Only CSV files are allowed!', 404));
    } else {
      callback(null, true);
    }
  },
});

export const tasksRoutes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      try {
        const { title, description } = request.body;

        if (!title) throw new AppError('Title is required', 404);
        if (!description) throw new AppError('Description is required', 404);

        const task = new Task(title, description);
        database.insert('tasks', task);

      } catch (error) {
        if (error instanceof AppError) {
          return response.writeHead(error.statusCode).end(
            JSON.stringify({ error: error.message })
          );
        }

        return response.writeHead(500).end(
          JSON.stringify({ error: error.message })
        );
      }

      return response.writeHead(201).end();
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { search } = request.query;

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null);

      return response.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      try {
        const { id } = request.params;
        const { title, description } = request.body;

        const task = database.find('tasks', id);

        if (!task) throw new AppError('Task with id not found', 404);

        if (!title) throw new AppError('Title is required', 404);

        if (!description) throw new AppError('Description is required', 404);

        database.update('tasks', id, {
          title,
          description,
        });
      } catch (error) {
        if (error instanceof AppError) {
          return response.writeHead(error.statusCode).end(
            JSON.stringify({ error: error.message })
          );
        }
        return response.writeHead(500).end(
          JSON.stringify({ error: error.message })
        )
      }

      return response.writeHead(202).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      try {
        const { id } = request.params;

        const task = database.find('tasks', id);

        if (!task) throw new AppError('Task with id not found', 404);

        database.delete('tasks', id);
      } catch (error) {
        if (error instanceof AppError) {
          return response.writeHead(error.statusCode).end(
            JSON.stringify({ error: error.message })
          );
        }
        return response.writeHead(500).end(
          JSON.stringify({ error: error.message })
        )
      }

      return response.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      try {
        const { id } = request.params;

        const task = database.find('tasks', id);

        if (!task) throw new AppError('Task with id not found', 404);

        const isTaskCompleted = !!task.completed_at;

        database.update('tasks', id, {
          completed_at: isTaskCompleted ? null : new Date(),
        });
      } catch (error) {
        if (error instanceof AppError) {
          return response.writeHead(error.statusCode).end(JSON.stringify({ error: error.message }));
        }

        return response.writeHead(500).end(
          JSON.stringify({ error: error.message })
        )
      }

      return response.writeHead(204).end();
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/import'),
    handler: async (request, response) => {
      try {
        await new Promise((resolve, reject) => {
          uploadCSV.single('file')(request, response, async (error) => {
            if (error instanceof AppError) {
              console.log('Error uploading file:', error);
              return reject(new AppError(error.message, error.statusCode));
            }

            if (error instanceof multer.MulterError) {
              console.log('Error uploading file:', error);
              return reject(new AppError(error.message, 500));
            }

            if (error) {
              console.log('Error uploading file:', error);
              return reject(new AppError(error.message, 500));
            }

            if (!request.file) {
              console.log('No files have been uploaded!');
              return reject(new AppError('No files have been uploaded!', 400));
            }

            const csvFile = request.file;

            const csvFileConverted = await converteCSVToJS(csvFile.path);

            for await (const task of csvFileConverted) {
              const { title, description } = task;

              const taskFormated = new Task(title, description);
              database.insert('tasks', taskFormated);
            }

            fs.unlinkSync(csvFile.path);// apagando o arquivo depois de cadastrar os dados no banco

            return resolve();// resolve a promise se tudo for bem sucedido
          });
        });

        return response.writeHead(201).end(
          JSON.stringify({ message: 'File uploaded successfully!' })
        );

      } catch (error) {
        if (error instanceof AppError) {
          return response.writeHead(error.statusCode).end(
            JSON.stringify({ error: error.message })
          );
        }

        return response.writeHead(500).end(
          JSON.stringify({ error: error.message })
        )
      }
    }
  }
]