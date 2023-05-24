import * as React from "react";
import { MovieTileProps, ShowCaseProps } from "../models/proptypes";
import { ApiDataEntry } from "../models/types";

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
    backdrop: `http://image.tmdb.org/t/p/original/${title.backdrop_path}`,
  };
}

export const Showcase: React.FC<ShowCaseProps> = ({
  heading,
  titles,
  MovieTile,
  media_type,
}) => {
  const content = React.useMemo(() => {
    if (titles) {
      return titles.map((title) => (
        <MovieTile
          key={title.id}
          {...createMovieTileProps(title, media_type)}
        />
      ));
    }

    return [];
  }, [titles]);

  return (
    <div className="title-list">
      <div className="title">
        <h1>{heading}</h1>
        <div className="titles-wrapper">
          {content.length ? (
            content
          ) : (
            <p style={{ color: "gray" }}>nothing found</p>
          )}
        </div>
      </div>
    </div>
  );
};
