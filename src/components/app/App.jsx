import React, { useState, useEffect } from 'react';
import './App.css';

// Import components
import AlbumList from '../albumList/AlbumList';
import Lyrics from '../lyrics/Lyrics';
import TrackList from '../trackList/TrackList';

import { Router } from '@reach/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// The number of albums to query from the API
const NUM_OF_ALBUMS = 4;

const App = () => {
  const [data, setData] = useState({ albumList: [] });

  const handleError = () =>
    toast.error('💔 Sorry! An error has occured.', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  // Call the musixmatch api for info about beatles albums on mount
  useEffect(() => {
    // To preserve the limited API calls
    // If we already have the data, do not request again
    if (data.albumList.length > 0) {
      return;
    }
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=160&s_release_date=asc&g_album_name=1&page_size=${NUM_OF_ALBUMS}&apikey=e0eba28371a957ddec0895517ab94353`,
      )
      .then((response) => {
        // handle success
        setData({ ...data, albumList: response.data.message.body.album_list });
      })
      .catch((error) => {
        // handle error
        console.log(error);
        // Would normally describe the error and/or pass an error code
        handleError();
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
      <ToastContainer />
    </div>
  );
};

export default App;
