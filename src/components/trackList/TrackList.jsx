import React, { useState, useEffect } from 'react';
import './TrackList.css';

import Nav from '../nav/Nav';

import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrackList = ({ albumId }) => {
  // Tracks set to empty array initially
  const [tracks, setTracks] = useState([]);

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

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${albumId}&page=1&page_size=20&apikey=${process.env.REACT_APP_MM_KEY}`,
      )
      .then((response) => {
        // handle success
        setTracks([...response.data.message.body.track_list]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        // Would normally describe the error and/or pass an error code
        handleError();
      });
  }, []);

  return (
    <>
      <Nav route={'/'} />
      <div className="trackList">
        {tracks.length > 0 ? (
          <ul>
            {tracks.map(({ track }) => {
              // Checking if lyrics for this exist on the API.
              // If not, do not render the <Link> so users cannot
              // visit the lyrics page and request lyrics that are unavilable.
              if (track.has_lyrics === 1) {
                return (
                  <Link to={`/lyrics/${track.track_id}`} key={track.track_id}>
                    <li>{track.track_name}</li>
                  </Link>
                );
              } else {
                return <li key={track.track_id}>{track.track_name}</li>;
              }
            })}
          </ul>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default TrackList;

TrackList.propTypes = {
  albumId: PropTypes.string,
};
