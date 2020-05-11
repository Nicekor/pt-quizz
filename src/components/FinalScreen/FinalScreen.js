import React, { useContext } from 'react';

import Button from '../UI/Button/Button';

import classes from './finalScreen.module.css';
import { LanguageContext } from '../../context/LanguageContext';
import uiLabel from '../../assets/uiLabel.json';

const FinalScreen = ({ score, onPlayAgain, numQuestions }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className={[classes.finalScreen, classes.fadeIn].join(' ')}>
      <h1 className={classes.gameOver}>GAME OVER</h1>
      <p>
        {uiLabel.finalScore[language]}:{' '}
        <span style={{ color: score >= numQuestions / 2 ? 'green' : 'red' }}>
          {score}/{numQuestions}
        </span>
      </p>
      <Button onClick={onPlayAgain}>{uiLabel.playAgain[language]}</Button>
    </div>
  );
};

export default FinalScreen;
