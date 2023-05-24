import { PiletApi } from "piral-base";
import { getUrlFromModule } from "./utils";
import { ComponentReference, UserPiletContext, StoreModule } from "./types";

function componentsToObj(components: Array<ComponentReference>) {
  return Object.fromEntries(
    components.map((c) => [
      c.id,
      {
        script: c.script,
        origin: c.origin,
        client: c.client,
        server: c.server,
      },
    ])
  );
}

export function updateStore(context: UserPiletContext, name: string, item: any) {
  const store = context.registry.stores.get(name);

  if (store) {
    store.value.update(item);
  }
}

export function initStore(
  api: PiletApi,
  mod: StoreModule<any>,
  initialValue?: any
) {
  const url = getUrlFromModule(mod);
  const value = mod.default(api, initialValue);
  return {
    url,
    value,
  };
}

export function serializePartialState(
  usedComponents: Array<ComponentReference>
) {
  return JSON.stringify({
    components: componentsToObj(usedComponents),
  });
}

export function serializeState(
  context: UserPiletContext,
  usedComponents: Array<ComponentReference>
) {
  return JSON.stringify({
    deps: context.dependencies,
    components: componentsToObj(usedComponents),
    stores: Object.fromEntries(
      Object.entries(Object.fromEntries(context.registry.stores)).map(
        ([name, store]) => [name, store.url]
      )
    ),
    data: Object.fromEntries(
      Object.entries(Object.fromEntries(context.registry.stores)).map(
        ([name, store]) => [name, store.value.get()]
      )
    ),
    pilets: context.pilets.map((pilet) => ({
      name: pilet.name,
      version: pilet.version,
      spec: pilet.spec,
      link: pilet.link,
      dependencies: pilet.dependencies,
      basePath: pilet.basePath,
    })),
  });
}
