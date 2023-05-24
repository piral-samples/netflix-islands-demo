import { FC } from "react";
import { HeroData, ApiDataEntry } from "./types";

export interface FavoritesButtonProps {
  movieId: string;
  media_type: "tv" | "movie";
  full: boolean;
}

export interface ShowCaseProps {
  media_type: "tv" | "movie";
  heading: string;
  titles: Array<ApiDataEntry>;
  MovieTile: FC<MovieTileProps>;
}

export interface HeroProps extends HeroData {
  FavoritesButton: FC<FavoritesButtonProps>;
}

export interface MovieTileProps {
  backdrop: string;
  title: string;
  score: string;
  overview: string;
  movieId: string;
  media_type: "tv" | "movie";
}

export interface HeroButtonProps {
  primary: boolean;
  text: string;
  href?: string;
}
