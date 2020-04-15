import React from "react";
import { Link } from "react-router-dom";

export const VideosView = ({ directory, videos }) => (
  <ul>
    {videos.map((video) => (
      <li>
        <Link to={`/video/${encodeURIComponent(`${directory}/${video}`)}`}>
          {video}
        </Link>
      </li>
    ))}
  </ul>
);
