import React, { useEffect, useCallback, useContext } from 'react';

import logo from '../../assets/images/Megaphone-icon.png';
import classes from './header.module.css';
import uiLabel from '../../assets/uiLabel.json';
import { LanguageContext } from '../../context/LanguageContext';

const flagsImages = {
  en: require('../../assets/images/uk-flag.png'),
  pt: require('../../assets/images/pt-flag.png'),
};

const Header = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (localStorage.getItem('language') === 'pt') {
      setLanguage('pt');
    } else {
      setLanguage('en');
      localStorage.setItem('language', 'en');
    }
  }, [setLanguage]);

  const changeLanguage = useCallback(() => {
    setLanguage((language) => (language === 'en' ? 'pt' : 'en'));
    localStorage.getItem('language') === 'en'
      ? localStorage.setItem('language', 'pt')
      : localStorage.setItem('language', 'en');
  }, [setLanguage]);

  return (
    <div className={classes.headerContainer}>
      <a href="/" className={classes.logoAnchor}>
        <img
          src={logo}
          alt={uiLabel.logoAlt[language]}
          className={classes.logo}
        ></img>
      </a>
      <h1>Quizz Time!</h1>
      <img
        src={flagsImages[language]}
        alt={uiLabel.flagAlt[language]}
        className={classes.flag}
        onClick={changeLanguage}
      ></img>
    </div>
  );
};

export default Header;
