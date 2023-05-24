import "./style.scss";

export function setup(api: any) {
  api.setStore("user", () => import("./store"));

  api.registerComponent(
    "header-items",
    () => import("./components/ProfileExtension"),
    {
      client: "none",
    }
  );

  api.registerPage("/profile", () => import("./components/ProfilePage"), {
    client: "none",
  });
}
