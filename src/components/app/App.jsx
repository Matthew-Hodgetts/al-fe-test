import React from 'react';
import './App.css';

// Import components
import AlbumList from '../albumList/AlbumList';
import Lyrics from '../lyrics/Lyrics';
import TrackList from '../trackList/TrackList';

const App = () => {
  return (
    <div className="App">
      <AlbumList />
      <Lyrics />
      <TrackList />
    </div>
  );
};

export default App;
