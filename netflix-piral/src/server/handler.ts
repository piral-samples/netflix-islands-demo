import { AdapterRequestContext, HattipHandler } from "@hattip/core";
import { readdirSync, createReadStream } from "fs";
import { resolve } from "path";
import { Readable } from "stream";
import { loadPilets } from "./components";
import { createSessionCookie, getSessionId } from "./cookie";
import { renderFragment, renderLayout } from "./render";
import { updateStore } from "./state";
import { getFragment } from "./route";
import { SessionId, UserPiletContext } from "./types";
import { initAsyncContext } from "./request";
import { callRegisteredHandlers } from "./handlers";
import { server } from "./constants";

function handleStoreUpdate(context: UserPiletContext, data: FormData) {
  const store = data.get("store");
  const item = JSON.parse(data.get("item") as string);

  if (store && typeof store === "string") {
    updateStore(context, store, item);
  }
}

const wwwroot = resolve(__dirname, "wwwroot");
const files = readdirSync(wwwroot).map((m) => `/${m}`);

async function getPiletContext(
  context: AdapterRequestContext
): Promise<[UserPiletContext, SessionId]> {
  const sessionId = getSessionId(context.request.headers.get("cookie"));
  const piletContext = await loadPilets(sessionId.value);
  return [piletContext, sessionId];
}

export const handler: HattipHandler = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (pathname === '/browser-refresh') {
    return context.passThrough();
  } else if (pathname.startsWith("/api/")) {
    const [piletContext, sessionId] = await getPiletContext(context);
    initAsyncContext(sessionId, piletContext, context);
    const response = await callRegisteredHandlers(
      piletContext,
      context.request
    );

    if (response) {
      return response;
    }
  } else if (context.request.method === "GET") {
    if (pathname.startsWith("/fragment/")) {
      const useragent = context.request.headers.get("user-agent");
      const [piletContext, sessionId] = await getPiletContext(context);
      const name = Buffer.from(pathname.substring(10), "base64url").toString(
        "utf8"
      );
      const content = getFragment(name, url, piletContext);
      initAsyncContext(sessionId, piletContext, context);
      const body = await renderFragment(content, useragent, piletContext);
      return new Response(body);
    } else if (pathname === "/") {
      return Response.redirect(server + "/browse");
    } else if (files.includes(pathname)) {
      const body = createReadStream(resolve(wwwroot, pathname.substring(1)));
      return new Response(Readable.toWeb(body) as any, {
        headers: { "content-type": "text/html" },
      });
    } else {
      const useragent = context.request.headers.get("user-agent");
      const [piletContext, sessionId] = await getPiletContext(context);
      const content = getFragment(`page:${pathname}`, url, piletContext);

      if (content) {
        initAsyncContext(sessionId, piletContext, context);
        const body = await renderLayout(content, useragent, piletContext);
        const response = new Response(body, {
          headers: { "content-type": "text/html" },
        });

        if (sessionId.renew) {
          response.headers.set(
            "set-cookie",
            createSessionCookie(sessionId.value)
          );
        }

        return response;
      }
    }
  } else if (context.request.method === "POST") {
    const [piletContext, sessionId] = await getPiletContext(context);
    const data = await context.request.formData();
    initAsyncContext(sessionId, piletContext, context);
    handleStoreUpdate(piletContext, data);
    return Response.redirect(server + pathname);
  } else if (context.request.method === "PATCH") {
    const [piletContext, sessionId] = await getPiletContext(context);
    const data = await context.request.json();
    initAsyncContext(sessionId, piletContext, context);
    updateStore(piletContext, data.store, data.item);
    return new Response("", { status: 201 });
  }

  return new Response("Not found.", { status: 404 });
};
