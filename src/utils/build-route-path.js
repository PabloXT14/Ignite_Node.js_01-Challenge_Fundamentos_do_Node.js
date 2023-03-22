export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const queryParametersRegex = '(?<query>\\?(.*))?$'

  const pathWithRouteParameters = path.replaceAll(routeParametersRegex, '(?<$1>[a-zA-Z0-9\-_]+)');

  const pathRegex = new RegExp(`^${pathWithRouteParameters}${queryParametersRegex}`);

  return pathRegex;
}