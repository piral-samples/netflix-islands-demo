import { createHook, executionAsyncId } from "async_hooks";

export interface AsyncContext<T> {
  get: () => T;
  store: (val: T) => void;
}

export function createAsyncContext<T>(): AsyncContext<T> {
  interface ContextStore {
    [name: string]: T;
  }

  const space: ContextStore = {};

  const asyncHook = createHook({
    init(asyncId, _type, triggerId, _resource) {
      if (space[triggerId]) {
        space[asyncId] = space[triggerId];
      }
    },
    destroy(asyncId) {
      if (space[asyncId]) {
        delete space[asyncId];
      }
    },
  });
  return {
    get() {
      const eid = executionAsyncId();
      return space[eid];
    },
    store(value: T) {
      asyncHook.enable();
      const eid = executionAsyncId();
      space[eid] = value;
    },
  };
}
