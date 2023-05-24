import * as React from "react";
import { RenderContext } from "./RenderContext";
import { ComponentReference } from "./types";

interface PiralComponentProps {
  component: ComponentReference;
  params: any;
  group: string;
}

export const PiralComponent: React.FC<PiralComponentProps> = ({
  component,
  params,
  group,
}) => {
  const renderContext = React.useContext(RenderContext);
  const Loader = renderContext.include(component);

  return (
    <Loader>
      {(Component, api, data) => (
        <piral-component
          cid={component.id}
          origin={api.meta.name}
          data={JSON.stringify(data)}
          group={group}
        >
          {component.server === "load" && (
            <Component {...params} {...data} api={api} />
          )}
        </piral-component>
      )}
    </Loader>
  );
};
