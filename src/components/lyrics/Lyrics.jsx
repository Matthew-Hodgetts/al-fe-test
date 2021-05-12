import React, { useState, useEffect } from 'react';
import './Lyrics.css';

import axios from 'axios';
import PropTypes from 'prop-types';

const Lyrics = ({ trackId }) => {
  const [songLyrics, setsongLyrics] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=bc5c8ecb8a2ec0d6d45fc2c1c2474894`,
      )
      .then((response) => {
        // handle success
        console.log(response.data.message.body.lyrics);
        setsongLyrics(response.data.message.body.lyrics.lyrics_body);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }, []);
  return <div className="lyrics">{songLyrics}</div>;
};

export default Lyrics;

Lyrics.propTypes = {
  trackId: PropTypes.string,
};
