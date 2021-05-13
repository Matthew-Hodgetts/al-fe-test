import React from 'react';
import './AlbumList.css';

import { Link } from '@reach/router';
import PropTypes from 'prop-types';

const AlbumList = ({ albums }) => {
  return (
    <div className="albumList">
      <ul>
        {albums.map(({ album }) => (
          <Link to={`/songs/${album.album_id}`} key={album.album_id}>
            <li>
              <h2>{album.album_name}</h2>
              <span className="author">{album.artist_name}</span>
              {album.album_rating ? (
                <span className="rating">{album.album_rating}/100</span>
              ) : (
                ''
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;

AlbumList.propTypes = {
  albums: PropTypes.array,
};
