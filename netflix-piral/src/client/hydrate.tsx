import * as React from "preact/compat";
import { PiletApi } from "piral-base/minimal";
import { Updater } from "./Updater";

export function hydrate(
  element: Element,
  Component: React.FC<any>,
  api: PiletApi,
  params: any,
  data: any
) {
  React.hydrate(
    <Updater
      params={params}
      api={api}
      Component={Component}
      container={element}
      data={data}
    />,
    element
  );
}

export function render(
  element: Element,
  Component: React.FC<any>,
  api: PiletApi,
  params: any,
  data: any
) {
  React.render(
    <Updater
      params={params}
      api={api}
      Component={Component}
      container={element}
      data={data}
    />,
    element
  );
}
