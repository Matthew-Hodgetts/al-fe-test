import React, { useState, useEffect } from 'react';
import './Lyrics.css';

import Nav from '../nav/Nav';

import axios from 'axios';
import PropTypes from 'prop-types';

const Lyrics = ({ trackId }) => {
  const [songLyrics, setsongLyrics] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=bc5c8ecb8a2ec0d6d45fc2c1c2474894`,
      )
      .then((response) => {
        // handle success
        setsongLyrics(
          response.data.message.body.lyrics.lyrics_body.split('\n\n'),
        );
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <>
      <Nav route={-1} />
      <div className="lyrics">
        {songLyrics.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </>
  );
};

export default Lyrics;

Lyrics.propTypes = {
  trackId: PropTypes.string,
};
