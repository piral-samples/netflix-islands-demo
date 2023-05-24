import { useState, useEffect } from 'react';

export function useFavorites(api: any) {
  const favoritesStore = api.getStore("favorites");
  const [favorites, setFavorites] = useState(
    favoritesStore.get().favorites
  );

  useEffect(() => {
    const handler = (ev: any) => setFavorites(ev.favorites);

    api.on("updated-favorites", handler);
    return () => {
      api.off("updated-favorites", handler);
    };
  }, []);

  return [favorites, (favorites) => favoritesStore.update(favorites)];
}
