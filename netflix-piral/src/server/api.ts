import * as React from "react";
import { initializeApi, PiletApiCreator } from "piral-base";
import { match } from "path-to-regexp";
import { events } from "./events";
import { server } from "./constants";
import { initStore } from "./state";
import { getUrlFromCb } from "./utils";
import {
  Registry,
  MfComponentProps,
  StoreModule,
  RenderingOptions,
  EndpointHandler,
  ComponentHandler,
} from "./types";

export function makeApiCreator(
  Component: React.ComponentType<MfComponentProps>,
  currentRegistry: Registry,
  previousRegistry: Registry | undefined,
  pending: Array<Promise<any>>
): PiletApiCreator {
  return (target) => {
    const api = initializeApi(target, events);
    Object.assign(api.meta.config, { server });
    return Object.assign(api, {
      Component,
      registerHandler(
        path: string,
        handlerLoader: () => Promise<EndpointHandler>
      ) {
        pending.push(
          handlerLoader().then((handler) =>
            currentRegistry.handlers.set(path, {
              ...handler,
              matcher: match(path),
            })
          )
        );
      },
      registerPage(
        path: string,
        componentLoader: () => Promise<ComponentHandler>,
        options: RenderingOptions = {}
      ) {
        const name = `page:${path}`;
        currentRegistry.pages.set(path, {
          component: name,
          matcher: match(path),
        });
        api.registerComponent(name, componentLoader, options);
      },
      unregisterPage(
        path: string,
        componentLoader: () => Promise<ComponentHandler>
      ) {
        const reference = currentRegistry.pages.get(path);

        if (reference) {
          const name = reference.component;
          currentRegistry.pages.delete(path);
          api.unregisterComponent(name, componentLoader);
        }
      },
      registerComponent(
        name: string,
        componentLoader: () => Promise<ComponentHandler>,
        options: RenderingOptions = {}
      ) {
        const { client = "load", server = "load", data = {} } = options;
        const components = currentRegistry.components.get(name) || [];
        const suffix = (components.length + 960).toString(16);
        components.push({
          id: `${name}-${suffix}`,
          api,
          client,
          server,
          data,
          origin: target.name,
          script: getUrlFromCb(target.basePath, componentLoader),
          loader: componentLoader,
        });
        currentRegistry.components.set(name, components);
      },
      unregisterComponent(
        name: string,
        componentLoader: () => Promise<ComponentHandler>
      ) {
        const components = currentRegistry.components.get(name) || [];
        const index = components.findIndex((c) => c.loader === componentLoader);

        if (index !== -1) {
          components.splice(index, 1);
        }

        if (components.length === 0) {
          currentRegistry.components.delete(name);
        }
      },
      getStore(name: string) {
        return currentRegistry.stores.get(name)?.value;
      },
      setStore(name: string, storeLoader: () => Promise<StoreModule<any>>) {
        const initValue = previousRegistry?.stores.get(name)?.value.get();
        pending.push(
          storeLoader().then((m) =>
            currentRegistry.stores.set(name, initStore(api, m, initValue))
          )
        );
      },
    });
  };
}
