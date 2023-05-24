import * as React from "react";
import { Favorite } from "./Favorite";
import { NoFavs, NoUser } from "./Messages";
import { MovieTileProps } from "../models/proptypes";
import { FavoriteData } from "../models/types";
import { useFavorites } from "../hooks/useFavorites";

interface FavoritesProps {
  api: any;
}

const Favorites: React.FC<FavoritesProps> = ({ api }) => {
  const [favorites] = useFavorites(api);
  const userStore = api.getStore("user");
  const { user } = userStore.get();

  const MovieTile: React.FC<MovieTileProps> = (props) => (
    <api.Component name="MovieTile" params={props} />
  );

  if (!user) {
    return <NoUser />;
  }

  if (!Object.keys(favorites).length) {
    return <NoFavs />;
  }

  return (
    <div className="favorites">
      {Object.entries(favorites as FavoriteData).map(([k, v]) => (
        <Favorite key={k} id={k} media_type={v} MovieTile={MovieTile} />
      ))}
    </div>
  );
};

export default Favorites;
