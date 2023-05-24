import "./style.scss";

export function setup(app: any) {
  app.registerComponent("MovieTile", () => import("./components/MovieTile"), {
    client: "none",
  });

  app.registerPage(
    "/watch/:media_type/:video_id",
    () => import("./components/WatchPage"),
    {
      client: "none",
    }
  );
}
