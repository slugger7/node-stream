import React from 'react';
import './App.css';
import { Video } from './components/video/Video';

const directory = '/mnt/videos/sample1.mp4';

function App() {
  return (
    <div className="App">
      <Video source={directory} />
    </div>
  );
}

export default App;
