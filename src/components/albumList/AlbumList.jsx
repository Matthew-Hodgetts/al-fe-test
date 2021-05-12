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
            <li>{album.album_name}</li>
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
