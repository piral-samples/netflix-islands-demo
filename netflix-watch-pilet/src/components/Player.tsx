import * as React from "react";

interface PlayerProps {
  video_id: string;
  media_type: "tv" | "movie";
}

// This is obviously a dummy player.
// More info on https://bit.ly/3rETEro
export const Player: React.FC<PlayerProps> = () => (
  <div>
    <iframe
      className="Player"
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);
