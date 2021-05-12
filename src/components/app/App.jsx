import React, { useState, useEffect } from 'react';
import './App.css';

import { Router } from '@reach/router';
import axios from 'axios';
// Import components
import AlbumList from '../albumList/AlbumList';
import Lyrics from '../lyrics/Lyrics';
import TrackList from '../trackList/TrackList';

const App = () => {
  // State
  const [data, setData] = useState({ albumList: [] });

  // Call the musixmatch api for info about beatles albums
  useEffect(() => {
    console.log('mounted');
    axios
      .get('/albums.json')
      .then(function (response) {
        // handle success
        console.log(response);
        setData({ ...data, albumList: response.data.message.body.album_list });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <AlbumList path="/" albums={data.albumList} />
        <Lyrics path="lyrics" />
        <TrackList path="songs/:albumId" />
      </Router>
    </div>
  );
};

export default App;
