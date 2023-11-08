import * as React from "react";
import { Hero } from "./Hero";
import { Showcase } from "./Showcase";
import { MovieTileProps } from "../models/proptypes";
import { ApiDataEntry, HeroData } from "../models/types";

interface BrowseProps {
  api: any;
  hero: HeroData;
  showcases: Array<{
    heading: string;
    titles: Array<ApiDataEntry>;
    media_type: "tv" | "movie";
  }>;
}

const Browse: React.FC<BrowseProps> = ({ api, hero, showcases }) => {
  const MovieTile: React.FC<MovieTileProps> = (props) => (
    <api.Component name="MovieTile" params={props} />
  );

  const FavoritesButton: React.FC<any> = (props) => (
    <api.Component name="ListToggle" params={props} />
  );

  return (
    <div className="Browse">
      <api.Component name="BrowsePageTop" />
      <Hero {...hero} FavoritesButton={FavoritesButton} />
      {showcases.map((data, i) => (
        <Showcase MovieTile={MovieTile} {...data} key={i} />
      ))}
      <api.Component name="BrowsePageBottom" />
    </div>
  );
};

export default Browse;
