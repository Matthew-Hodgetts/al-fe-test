import React from 'react';
import './Nav.css';

import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { IoArrowBackSharp } from 'react-icons/io5';

const Nav = ({ route }) => {
  return (
    <div className="nav">
      <button role="button" onClick={() => navigate(route)}>
        <IoArrowBackSharp />
      </button>
    </div>
  );
};

export default Nav;

Nav.propTypes = {
  route: PropTypes.any.isRequired,
};
