import React, { useState, useEffect } from 'react';
import './TrackList.css';

import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const TrackList = ({ albumId }) => {
  // Tracks set to empty array initially
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${albumId}&page=1&page_size=20&apikey=bc5c8ecb8a2ec0d6d45fc2c1c2474894`,
      )
      .then((response) => {
        // handle success
        console.log(response.data.message.body.track_list);
        setTracks([...response.data.message.body.track_list]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }, []);

  return (
    <div className="trackList">
      <ul>
        {tracks.map(({ track }) => (
          <Link to={`/lyrics/${track.track_id}`} key={track.track_id}>
            <li>{track.track_name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;

TrackList.propTypes = {
  albumId: PropTypes.string,
};
