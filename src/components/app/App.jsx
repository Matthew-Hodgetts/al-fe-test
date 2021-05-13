import React, { useState, useEffect } from 'react';
import './App.css';

import { Router } from '@reach/router';
import axios from 'axios';

// Import components
import AlbumList from '../albumList/AlbumList';
import Lyrics from '../lyrics/Lyrics';
import TrackList from '../trackList/TrackList';

const App = () => {
  const [data, setData] = useState({ albumList: [] });

  // Call the musixmatch api for info about beatles albums
  useEffect(() => {
    // To preserve the limited API calls
    if (data.albumList.length > 0) {
      return;
    }
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=160&s_release_date=asc&g_album_name=1&apikey=e0eba28371a957ddec0895517ab94353`,
      )
      .then((response) => {
        // handle success
        setData({ ...data, albumList: response.data.message.body.album_list });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Router>
          <AlbumList path="/" albums={data.albumList} />
          <Lyrics path="lyrics/:trackId" />
          <TrackList path="songs/:albumId" />
        </Router>
      </div>
    </div>
  );
};

export default App;
