import { buildRoutePath } from "../utils/build-route-path.js";

export const tasksRoutes = [
  {
    method: 'GET',
    path:  buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      console.log(request.params);
      console.log(request.query);

      return response.end('List Tasks');
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body;

      return response.end(JSON.stringify({ title, description }));
    }
  }
]