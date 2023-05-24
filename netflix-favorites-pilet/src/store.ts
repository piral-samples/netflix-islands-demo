import { FavoriteData } from "./models/types";

const defaultInit: { favorites: FavoriteData } = { favorites: {} };

function storeHandler(api: any, init = defaultInit) {
  let favorites: FavoriteData = init.favorites;

  return {
    update(newFavorites: FavoriteData) {
      favorites = newFavorites;
      api.emit("updated-favorites", { favorites });
    },
    get() {
      return {
        favorites,
      };
    },
  };
}

export default storeHandler;
