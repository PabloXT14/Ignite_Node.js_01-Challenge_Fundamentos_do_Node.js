import { buildRoutePath } from "../utils/build-route-path.js";
import { Database } from "../database/index.js";
import { Task } from '../models/Task.js';
import { AppError } from "../utils/AppError.js";

const database = new Database();

export const tasksRoutes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body;

      try {
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
      const { id } = request.params;
      const { title, description } = request.body;

      try {
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
      const { id } = request.params;

      try {
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
      const { id } = request.params;

      try {
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
  }
]