import React, { useState, useEffect } from "react";
import { getFilesAtDir } from "../../api/fs";
import { Loader } from '../../components/Loader';
import { VideosView } from './VideosView';

const fetchVideos = async (directory, setLoading, setVideos) => {
  try {
    setLoading(true);
    const videosResponse = await getFilesAtDir(directory);
    setVideos(videosResponse.contents);
  } finally {
    setLoading(false);
  }
};

export const Videos = () => {
  const [loading, setLoading] = useState(false);
  const [directory] = useState("/mnt/videos");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos(directory, setLoading, setVideos);
  }, [directory]);

  return <section className="section">
    <Loader loading={loading}>
      <VideosView videos={videos} directory={directory} />
    </Loader>
  </section>;
};
    