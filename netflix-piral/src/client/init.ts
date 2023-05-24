import * as React from "preact/compat";
import {
  createListener,
  registerDependencies,
  registerDependencyUrls,
  PiletApi,
} from "piral-base/minimal";
import { Component } from "./Component";
import { createStores, deserializeState } from "./state";
import { integrateDebugTools } from "./debug";
import { createCustomElements } from "./element";
import { Stores } from "./types";

export async function initPiral() {
  const state = deserializeState();
  const events = createListener();
  const stores: Stores = {};
  const api = {
    ...events,
    Component,
    getStore(name: string) {
      return stores[name];
    },
  } as PiletApi;

  integrateDebugTools(events, state);

  await registerDependencies({
    react: React,
    "react@18.2.0": React,
  });

  registerDependencyUrls(state.deps);

  await createStores(state, stores, api);

  createCustomElements(state, api);
}
