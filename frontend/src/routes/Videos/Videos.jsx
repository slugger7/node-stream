import React, { useState, useEffect } from "react";
import { getFilesAtDir } from "../../api/fs";
import { Loader } from '../../components/Loader';
import { VideosView } from './VideosView';

export const Videos = () => {
  const [loading, setLoading] = useState(false);
  const [directory, setDirectory] = useState("/mnt/videos");
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const videosResponse = await getFilesAtDir(directory);
      setVideos(videosResponse.contents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return <section className="section">
    <Loader loading={loading}>
      <VideosView videos={videos} directory={directory} />
    </Loader>
  </section>;
};
    