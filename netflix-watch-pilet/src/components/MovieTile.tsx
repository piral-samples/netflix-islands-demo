import * as React from "react";

interface MovieTileProps {
  backdrop: string;
  title: string;
  score: string;
  overview: string;
  movieId: string;
  media_type: "tv" | "movie";
  api: any;
}

const MovieTile: React.FC<MovieTileProps> = ({ api, ...params }) => {
  const backDrop = params.backdrop.match(/.*(null|undefined)$/)
    ? "https://i.imgur.com/QVaMho2.png"
    : params.backdrop;

  return (
    <div
      className="MovieTile"
      id={params.movieId}
      data-mediatype={params.media_type}
      style={{ backgroundImage: `url(${backDrop})` }}
    >
      <div className="overlay">
        <a href={`/watch/${params.media_type}/${params.movieId}`}>
          <div className="title">{params.title}</div>
          <div className="rating">{params.score} / 10</div>
          <div className="plot">{params.overview}</div>
        </a>
        <api.Component name="ListToggle" params={params} />
      </div>
    </div>
  );
};

export default MovieTile;
