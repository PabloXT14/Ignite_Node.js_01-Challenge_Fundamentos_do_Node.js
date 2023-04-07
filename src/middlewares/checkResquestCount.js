const MAX_REQUESTS_PER_SECOND = 2;
const INTERVAL_DURATION_MS = 1000;
const requestsCounts = new Map();

export async function checkRequestsCount(request, response) {
  const ClientIP = request.socket.remoteAddress;

  // Obtendo a contagem de requisições do IP para o intervalo atual
  const currentTime = Date.now();
  let count = requestsCounts.get(ClientIP)?.count || 0;
  const lastRequestTime = requestsCounts.get(ClientIP)?.lastRequestTime || 0;

  // Verificando se o intervalo de tempo atual já passou
  if (currentTime - lastRequestTime > INTERVAL_DURATION_MS) {
    count = 0;
  }

  // Verificando se a contagem de requisições atingiu o limite para este intervalo
  if (count >= MAX_REQUESTS_PER_SECOND) {
    return response.writeHead(429, { contentType: 'application/json'  }).end(JSON.stringify({
      error: 'Too many requests',
    }));
  }

  // Incrementando a contagem de requisições para este IP e armazenando a hora da última requisição
  requestsCounts.set(ClientIP, { count: count + 1, lastRequestTime: currentTime });
}