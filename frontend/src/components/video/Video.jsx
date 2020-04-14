import React from 'react';

export const Video = ({ source }) => (
    <video id="videoPlayer" controls muted="muted" autoplay> 
        <source src={`http://localhost:8001/video/${encodeURIComponent(source)}`} type="video/mp4" />
    </video>
);