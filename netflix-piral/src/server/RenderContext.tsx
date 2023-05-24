import * as React from "react";
import { PiletApi } from "piral-base";
import { ComponentReference, UserPiletContext } from "./types";

async function getData(retrievers: Record<string, () => Promise<any>>) {
  const data = {};

  await Promise.all(
    Object.entries(retrievers).map(async ([name, retriever]) => {
      const item = await retriever();
      data[name] = item;
    })
  );

  return data;
}

interface WrapperProps {
  children(
    Component: React.ComponentType,
    api: PiletApi,
    data: any
  ): React.ReactElement;
}

interface SummaryProps {
  children(
    context: UserPiletContext,
    usedComponents: Array<ComponentReference>
  ): React.ReactElement;
}

function createBlocker() {
  const promises = new Set<Promise<void>>();

  async function waitUntilLoaded() {
    while (promises.size > 0) {
      await Promise.all(promises);
    }
  }

  function enqueue<T>(promise: Promise<T>): Promise<T> {
    const p = promise.then(() => promises.delete(p));
    promises.add(p);
    return promise;
  }

  enqueue(new Promise((resolve) => setTimeout(resolve, 0)));
  return { waitUntilLoaded, enqueue };
}

export function createController(context: UserPiletContext) {
  const refs = new Map<
    ComponentReference,
    React.LazyExoticComponent<React.ComponentType<WrapperProps>>
  >();
  const { waitUntilLoaded, enqueue } = createBlocker();

  const Summary = React.lazy<React.ComponentType<SummaryProps>>(async () => {
    await waitUntilLoaded();

    return {
      default: ({ children }) => {
        const components = [...refs.keys()];
        return children(context, components);
      },
    };
  });

  return {
    include(component: ComponentReference) {
      const ref = refs.get(component);

      if (!ref) {
        const Wrapper = React.lazy(async () => {
          const [data, Component] = await enqueue(
            Promise.all([
              getData(component.data),
              component.loader().then((c) => c.default),
            ])
          );
          const api = component.api;
          return {
            default: ({ children }) => children(Component, api, data),
          };
        });

        refs.set(component, Wrapper);
        return Wrapper;
      }

      return ref;
    },
    Summary,
  };
}

export const RenderContext =
  React.createContext<ReturnType<typeof createController>>(undefined);
