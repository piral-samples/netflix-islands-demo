import WebSocket from "ws";
import { createServer } from "http";
import { createMiddleware } from "@hattip/adapter-node";
import { events } from "./events";
import { handler } from "./handler";
import { installFetchInterceptor } from "./fetch";
import {
  feedEvents,
  port,
  host,
  reconnectInterval,
  changeEvent,
  replaceEvent,
} from "./constants";

installFetchInterceptor();

function connect() {
  const ws = new WebSocket(feedEvents, {
    perMessageDeflate: false,
  });

  ws.on("message", (buffer) => {
    const msg = JSON.parse(buffer.toString("utf8"));

    if (msg.type === "update-pilet") {
      // event from the feed service (in prod)
      events.emit(changeEvent, msg.data);
    } else if (typeof msg.type === "undefined" && msg.spec === "v3") {
      // event from the debug process (in development)
      events.emit(changeEvent, {});
      events.emit(replaceEvent, msg);
    }
  });

  ws.on("close", function () {
    // make sure to always have a WS connection => reconnect
    // automatically once the given interval (in ms) is over
    setTimeout(connect, reconnectInterval);
  });
}

const middleware = createMiddleware(handler);

createServer((req, res) =>
  middleware(req, res, () => {
    if (req.url === "/browser-refresh") {
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      const changeHandler = (data: { name: string }) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      events.on(replaceEvent, changeHandler);

      res.on("close", () => {
        events.off(replaceEvent, changeHandler);
        res.end();
      });
    }
  })
).listen(port, () => {
  connect();

  console.log(`Server listening on http://${host}:${port}`);
});
