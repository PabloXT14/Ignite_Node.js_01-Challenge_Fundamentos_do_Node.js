import { buildRoutePath } from "../utils/build-route-path.js";
import { Database } from "../database/index.js";
import { Task } from '../models/Task.js';

const database = new Database();

export const tasksRoutes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body;

      const task = new Task(title, description);

      database.insert('tasks', task);

      return response.writeHead(202).end();
    }
  },
  {
    method: 'GET',
    path:  buildRoutePath('/tasks'),
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
        database.update('tasks', id, {
          title,
          description,
        });
      } catch (error) {
        return response.writeHead(404).end(JSON.stringify({ error: error.message }));
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
        database.delete('tasks', id);
      } catch (error) {
        return response.writeHead(404).end(JSON.stringify({ error: error.message }));
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
        database.complete('tasks', id);
      } catch(error) {
        return response.writeHead(404).end(JSON.stringify({ error: error.message }));
      }

      return response.writeHead(204).end();
    }
  }
]