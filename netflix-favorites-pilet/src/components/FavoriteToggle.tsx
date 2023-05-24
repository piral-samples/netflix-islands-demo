import * as React from "react";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteToggleProps {
  api: any;
  movieId: string;
  media_type: "tv" | "movie";
  full?: boolean;
}

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({
  api,
  movieId,
  media_type,
  full,
}) => {
  const [favorites, setFavorites] = useFavorites(api);
  const userStore = api.getStore("user");
  const { user } = userStore.get();

  const toggle = React.useCallback(() => {
    const { [movieId]: current, ...rest } = favorites;
    if (current) {
      setFavorites(rest);
    } else {
      setFavorites({ ...rest, [movieId]: media_type });
    }
  }, [favorites]);

  const icons = (
    <div>
      <i className="fa fa-fw fa-heart" />
      <i className="fa fa-fw fa-check" />
    </div>
  );

  if (!user) {
    return <></>;
  } else if (!full) {
    return (
      <div
        onClick={toggle}
        data-toggled={`${!!favorites[movieId]}`}
        className="ListToggle"
      >
        {icons}
      </div>
    );
  } else {
    return (
      <div
        onClick={toggle}
        className="button favorite-toggle-full"
        data-primary={false}
        data-toggled={`${!!favorites[movieId]}`}
      >
        {icons}
        Add to favorites
      </div>
    );
  }
};

export default FavoriteToggle;
