import { PiletMetadata } from "piral-base";
import type {
  ClientRendering,
  ServerRendering,
  StoreApi,
} from "../server/types";

export type Stores = Record<string, StoreApi<any>>;

export interface ComponentReference {
  client: ClientRendering;
  server: ServerRendering;
  script: string;
  origin: string;
}

export interface PiralClientState {
  components: Record<string, ComponentReference>;
  js: Array<string>;
  deps: Record<string, string>;
  data: Record<string, any>;
  stores: Record<string, string>;
  pilets: Array<PiletMetadata>;
}
