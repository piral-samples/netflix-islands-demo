import { PiletApi } from "piral-base/minimal";
import { updateStore } from "./network";
import { PiralClientState, Stores } from "./types";

export function createStores(
  state: PiralClientState,
  stores: Stores,
  api: PiletApi
) {
  return Promise.all(
    Object.entries(state.stores).map(async ([name, url]) => {
      const mod = await System.import(url as string);
      const store = mod.default(api, state.data[name]);
      stores[name] = {
        update(item: any) {
          store.update(item);
          updateStore(name, item);
        },
        get() {
          return store.get();
        },
      };
    })
  );
}

export function deserializeState() {
  // we obtain the serialized state
  const element = document.querySelector("script[type=piral-state]");

  if (element) {
    const state = JSON.parse(element.textContent);
    element.remove();
    return state;
  }

  return {};
}

export function patchState(state: PiralClientState) {
  const patch = deserializeState() as Partial<PiralClientState>;
  Object.assign(state.components, patch.components);
}
