import * as React from "react";
import { HeroButton } from "./HeroButton";
import { HeroProps } from "../models/proptypes";

export const Hero: React.FC<HeroProps> = (props) => {
  return (
    <div
      id="hero"
      className="hero"
      style={{ backgroundImage: `url(${props.backgroundUrl})` }}
    >
      <div className="content">
        <img className="logo" src={props.logoUrl} title="Logo" />
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <div className="button-wrapper">
          <HeroButton
            primary={true}
            text="Watch Now"
            href={`/watch/${props.media_type}/${props.movieId}`}
          />
          <props.FavoritesButton full={true} {...props} />
        </div>
      </div>
      <div className="overlay" />
    </div>
  );
};
