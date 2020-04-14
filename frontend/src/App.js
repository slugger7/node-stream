import React from 'react';
import logo from './logo.svg';
import './App.css';

const directory = '/mnt/videos/';

function App() {
  return (
    <div className="App">
      <video id="videoPlayer" controls muted="muted" autoplay> 
        <source src={`http://localhost:8001/video/${encodeURIComponent(directory)}sample1.mp4`} type="video/mp4" />
    </video>
    </div>
  );
}

export default App;
