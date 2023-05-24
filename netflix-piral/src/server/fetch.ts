import { server } from "./constants";
import { callRegisteredHandlers } from "./handlers";
import { asyncContext } from "./request";

export function installFetchInterceptor() {
  const originalFetch = globalThis.fetch;

  Object.defineProperty(globalThis, "fetch", {
    value(url: string | Request, options: RequestInit) {
      if (typeof url === "string" && url.startsWith(server)) {
        const { sessionId, context } = asyncContext.get();

        if (typeof options !== "object") {
          options = {};
        }

        if (typeof options.headers !== "object") {
          options.headers = {};
        }

        const headers = new Headers(options.headers);
        headers.set("cookie", `sid=${sessionId}`);
        options.headers = headers;

        if (url.startsWith(server + "/api/")) {
          const req = new Request(url, options);
          return callRegisteredHandlers(context, req);
        }
      }

      return originalFetch.call(global, url, options);
    },
    configurable: true,
  });
}
