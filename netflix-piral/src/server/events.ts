import EventEmitter from "events";
import { EventEmitter as PiralEventEmitter } from "piral-base";

const nativeEvents = new EventEmitter();

nativeEvents.setMaxListeners(0);

export const events: PiralEventEmitter = {
  emit(type, args) {
    nativeEvents.emit(type as string, args);
    return events;
  },
  on(type, cb) {
    nativeEvents.on(type as string, cb);
    return events;
  },
  off(type, cb) {
    nativeEvents.off(type as string, cb);
    return events;
  },
};
