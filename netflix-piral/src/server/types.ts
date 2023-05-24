import { PiletApi, PiletMetadata } from "piral-base";
import { ComponentType, HTMLAttributes, ReactNode } from "react";

export interface MfComponentProps {
  name: string;
  params?: any;
  render?(nodes: Array<ReactNode>): ReactNode;
}

export interface StoreApi<T> {
  get(): T;
  update(item: any): void;
}

export interface StoreModule<T> {
  default: (api: PiletApi, init: T) => StoreApi<T>;
}

export type ClientRendering =
  | "none"
  | "visible"
  | "load"
  | "idle"
  | `media=${string}`;

export type ServerRendering = "none" | "load";

export interface RenderingOptions {
  client?: ClientRendering;
  server?: ServerRendering;
  data?: Record<string, () => Promise<any>>;
}

declare module "piral-base/lib/types/runtime" {
  interface PiletApi {
    setStore(name: string, loader: () => Promise<StoreModule<any>>): void;
    getStore(name: string): StoreApi<any>;
    registerHandler(path: string, loader: () => Promise<EndpointHandler>): void;
    registerComponent(
      name: string,
      loader: () => Promise<ComponentHandler>,
      options?: RenderingOptions
    ): void;
    unregisterComponent(
      name: string,
      loader: () => Promise<ComponentHandler>
    ): void;
    registerPage(
      name: string,
      loader: () => Promise<ComponentHandler>,
      options?: RenderingOptions
    ): void;
    unregisterPage(name: string, loader: () => Promise<ComponentHandler>): void;
    Component: ComponentType<MfComponentProps>;
  }

  interface PiletMetadata {
    styles?: Array<string>;
  }
}

interface PiralComponentProps extends HTMLAttributes<{}> {
  cid: string;
  origin: string;
  data: string;
  group: string;
}

interface PiralSlotProps extends HTMLAttributes<{}> {
  name: string;
  group: string;
  params: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "piral-component": React.DetailedHTMLProps<PiralComponentProps, {}>;
      "piral-slot": React.DetailedHTMLProps<PiralSlotProps, {}>;
    }
  }

  interface HTMLElementTagNameMap {
    "piral-component": HTMLElement & {
      cid: string;
      origin: string;
      data: string;
      group: string;
    };
    "piral-slot": HTMLElement & {
      name: string;
      group: string;
      params: string;
    };
  }
}

export interface StoreReference {
  url: string;
  value: StoreApi<any>;
}

export interface ComponentReference {
  id: string;
  api: PiletApi;
  script: string;
  origin: string;
  client: ClientRendering;
  server: ServerRendering;
  data: Record<string, () => Promise<any>>;
  loader: () => Promise<ComponentHandler>;
}

export interface ComponentHandler {
  default: React.ComponentType;
}

export interface EndpointHandler {
  matcher(path: string): false | { params: Record<string, string> };
  GET?(context: Request, params: Record<string, string>): Promise<Response>;
  PUT?(context: Request, params: Record<string, string>): Promise<Response>;
  POST?(context: Request, params: Record<string, string>): Promise<Response>;
  PATCH?(context: Request, params: Record<string, string>): Promise<Response>;
  DELETE?(context: Request, params: Record<string, string>): Promise<Response>;
}

export interface PageReference {
  component: string;
  matcher(path: string): false | { params: Record<string, string> };
}

export interface SessionId {
  renew: boolean;
  value: string;
}

export interface Registry {
  pages: Map<string, PageReference>;
  components: Map<string, Array<ComponentReference>>;
  stores: Map<string, StoreReference>;
  handlers: Map<string, EndpointHandler>;
}

export interface UserPiletContext {
  Component: ComponentType<MfComponentProps>;
  cssLinks: Array<string>;
  cssContent: string;
  jsLinks: Array<string>;
  jsContent: string;
  dependencies: Record<string, string>;
  pilets: Array<PiletMetadata>;
  registry: Registry;
}

export interface PiletContext {
  cssLinks: Array<string>;
  cssContent: string;
  jsLinks: Array<string>;
  jsContent: string;
  dependencies: Record<string, string>;
  pilets: Array<PiletMetadata>;
}

export interface StateContext {
  Component: ComponentType<MfComponentProps>;
  registry: Registry;
  piletsRef: string;
}
