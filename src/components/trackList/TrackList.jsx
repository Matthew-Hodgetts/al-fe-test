import React, { useState, useEffect } from 'react';
import './TrackList.css';

import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const TrackList = ({ albumId }) => {
  // Tracks set to empty array initially
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${albumId}&page=1&page_size=20&apikey=bc5c8ecb8a2ec0d6d45fc2c1c2474894`,
      )
      .then((response) => {
        // handle success
        setTracks([...response.data.message.body.track_list]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="trackList">
      <ul>
        {tracks.map(({ track }) => {
          // Checking if lyrics for this exist on the API
          // If not, do not render the <Link>
          if (track.has_lyrics === 1) {
            return (
              <Link to={`/lyrics/${track.track_id}`} key={track.track_id}>
                <li>{track.track_name}</li>
              </Link>
            );
          } else {
            return <li>{track.track_name}</li>;
          }
        })}
      </ul>
    </div>
  );
};

export default TrackList;

TrackList.propTypes = {
  albumId: PropTypes.string,
};
