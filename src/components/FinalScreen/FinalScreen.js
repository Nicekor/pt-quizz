import React from 'react';

import Button from '../UI/Button/Button';

import classes from './finalScreen.module.css';

const FinalScreen = ({ score }) => {
  return (
    <div className={[classes.finalScreen, classes.fadeIn].join(' ')}>
      <h1 className={classes.gameOver}>GAME OVER</h1>
      <p>Final Score: {score}</p>
      <Button>Play Again</Button>
    </div>
  );
};

export default FinalScreen;
