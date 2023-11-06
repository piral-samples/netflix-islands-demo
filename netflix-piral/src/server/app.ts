import WebSocket from "ws";
import { createServer } from "@hattip/adapter-node";
import { events } from "./events";
import { handler } from "./handler";
import { feedEvents, port, host, reconnectInterval } from "./constants";
import { installFetchInterceptor } from "./fetch";

installFetchInterceptor();

function connect() {
  const ws = new WebSocket(feedEvents, {
    perMessageDeflate: false,
  });

  ws.on("message", (buffer) => {
    const msg = JSON.parse(buffer.toString("utf8"));

    if (
      msg.type === "update-pilet" ||
      (typeof msg.type === "undefined" && msg.spec === "v3")
    ) {
      events.emit("pilet-changed", msg.data);
    }
  });

  ws.on("close", function () {
    // make sure to always have a WS connection => reconnect
    // automatically once the given interval (in ms) is over
    setTimeout(connect, reconnectInterval);
  });
}

createServer(handler).listen(port, () => {
  connect();

  console.log(`Server listening on http://${host}:${port}`);
});
