import "./style.scss";

export function setup(app: any) {
  app.registerComponent(
    "header-items",
    () => import("./components/SearchExtension"),
    {
      server: "none",
    }
  );
}
