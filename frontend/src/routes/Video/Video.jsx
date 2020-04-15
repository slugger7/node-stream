import React from "react";
import { useParams } from "react-router-dom";

export const Video = () => {
  const { path } = useParams();
  return (
    <video id="videoPlayer" controls muted="muted" autoplay>
      <source
        src={`${process.env.REACT_APP_SERVER_URL}/video/${encodeURIComponent(
          path
        )}`}
        type="video/mp4"
      />
    </video>
  );
};
