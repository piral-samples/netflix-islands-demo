import { UserPiletContext } from "./types";

export async function callRegisteredHandlers(context: UserPiletContext, request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  for (const endpoint of context.registry.handlers.values()) {
    const result = endpoint.matcher(pathname);

    if (result && request.method in endpoint) {
      const handler = endpoint[request.method];
      return await handler(request, result.params);
    }
  }
}
