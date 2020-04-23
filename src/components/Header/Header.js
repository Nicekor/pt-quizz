import React from 'react';

import logo from '../../assets/images/Megaphone-icon.png';
import classes from './header.module.css';

const Header = () => {
  return (
    <div className={classes.headerContainer}>
      <img src={logo} alt="Megaphone logo" className={classes.logo}></img>
      <h1>Quizz Time!</h1>
    </div>
  );
};

export default Header;
