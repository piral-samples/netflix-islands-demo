import * as React from "react";
import { MovieTileProps } from "../models/proptypes";
import { ApiDataEntry } from "../models/types";

const apiKey = "87dfa1c669eea853da609d4968d294be";

function createMovieTileProps(
  title: ApiDataEntry,
  media_type: "tv" | "movie"
): MovieTileProps {
  return {
    media_type,
    movieId: title.id,
    title: title.name || title.original_title,
    score: title.vote_average,
    overview: title.overview,
    backdrop: `http://image.tmdb.org/t/p/original${title.backdrop_path}`,
  };
}

function loadContent(path: string, setData: (data: ApiDataEntry) => void) {
  let active = true;

  console.log("Load content", path, typeof window !== "undefined");

  fetch(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}`)
    .then((res) => res.json())
    .then(
      (data) => active && setData(data),
      (err) => console.error(err)
    );

  return () => {
    active = false;
  };
}

interface FavoriteProps {
  id: string;
  media_type: "tv" | "movie";
  MovieTile: React.FC<MovieTileProps>;
}

export const Favorite: React.FC<FavoriteProps> = (props) => {
  const [data, setData] = React.useState<ApiDataEntry>(null);

  React.useEffect(
    () => loadContent(`${props.media_type}/${props.id}`, setData),
    [props.id, props.media_type]
  );

  if (data) {
    const movieTileProps: MovieTileProps = createMovieTileProps(
      data,
      props.media_type
    );
    return <props.MovieTile key={props.id} {...movieTileProps} />;
  }

  return <></>;
};
