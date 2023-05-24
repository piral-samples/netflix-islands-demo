import * as React from "preact/compat";

export const Updater: React.FC<{
  params: any;
  Component: any;
  api: any;
  data: any;
  container: any;
}> = ({ params, Component, api, container, data }) => {
  const [state, setState] = React.useState(params);

  React.useEffect(() => {
    const element = container.parentElement;
    const handler = (ev: CustomEvent) => {
      setState(ev.detail);
    };

    element.addEventListener("params-changed", handler);

    return () => {
      element.removeEventListener("params-changed", handler);
    };
  }, []);

  return <Component {...state} {...data} api={api} />;
};
