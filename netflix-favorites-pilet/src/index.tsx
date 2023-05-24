import "./style.scss";

export function setup(api: any) {
  api.setStore("favorites", () => import("./store"));

  api.registerComponent("menu", () => import("./components/Menu"), {
    client: "none",
  });

  api.registerPage("/favorites", () => import("./components/Favorites"));

  api.registerComponent(
    "ListToggle",
    () => import("./components/FavoriteToggle")
  );
}
