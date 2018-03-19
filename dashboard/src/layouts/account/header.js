import React from "react";
import PropTypes from 'prop-types';

const Header = ({account}) => (
  <h1 className='hero'>
    {account.username}
  </h1>
);

Header.propTypes = {
  account: PropTypes.object.isRequired
};

export default Header;
