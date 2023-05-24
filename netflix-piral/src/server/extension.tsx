import * as React from "react";
import { v4 } from "uuid";
import { PiralComponent } from "./PiralComponent";
import { Registry, MfComponentProps } from "./types";

function defaultRender(nodes: Array<React.ReactNode>): React.ReactNode {
  return <>{nodes}</>;
}

export function makeComponent(
  registry: Registry
): React.ComponentType<MfComponentProps> {
  return ({ name, params, render = defaultRender }) => {
    const components = React.useMemo(
      () => registry.components.get(name) || [],
      [name]
    );
    const group = React.useMemo(() => v4(), []);

    return (
      <piral-slot name={name} params={JSON.stringify(params)} group={group}>
        {render(
          components.map((ref, i) => (
            <PiralComponent
              key={i}
              params={params}
              component={ref}
              group={group}
            />
          ))
        )}
      </piral-slot>
    );
  };
}
