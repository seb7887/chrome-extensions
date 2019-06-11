import React from 'react';

const Header = ({ category }) => (
  <h1 className="logo">
    <img className="logo-icon" src="../../icons/icon_128.png" />
    Quote of the Day - {category}
  </h1>
);

export default Header;
