import * as React from "react";
import { Player } from "./Player";

interface WatchPageProps {
  params: {
    video_id: string;
    media_type: "tv" | "movie";
  };
}

const WatchPage: React.FC<WatchPageProps> = ({ params }) => {
  return (
    <div className="WatchPage">
      <Player {...params} />
    </div>
  );
};

export default WatchPage;
