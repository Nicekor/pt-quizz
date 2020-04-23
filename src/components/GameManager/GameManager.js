import React, { useState, useCallback, useEffect } from 'react';
import Question from '../Question/Question';
import GameMenu from '../GameMenu/GameMenu';
import classes from './gameManager.module.css';

const anyCategoryOption = { name: 'Any Category', id: '' };
const GameManager = () => {
  const [categories, setCategories] = useState([anyCategoryOption]);
  const difficulties = [
    { title: 'Any Difficulty', value: '' },
    { title: 'Easy', value: 'easy' },
    { title: 'Medium', value: 'medium' },
    { title: 'Hard', value: 'hard' },
  ]; // these values are hardcoded because the api doesn't provide these
  const questionsTypes = [
    { title: 'Any Type', value: '' },
    { title: 'Multiple Choice', value: 'multiple' },
    { title: 'True/False', value: 'boolean' },
  ]; // hardcoded for the same reason as the difficulties
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOptions, setGameOptions] = useState({});
  const [token, setToken] = useState('');
  const [error, setError] = useState(false);

  const getToken = useCallback(async () => {
    try {
      const res = await fetch(
        'https://opentdb.com/api_token.php?command=request'
      );
      const { token } = await res.json();
      setToken(token);
    } catch (err) {
      setError(err);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const res = await fetch('https://opentdb.com/api_category.php');
      const { trivia_categories } = await res.json();
      setCategories([anyCategoryOption, ...trivia_categories]);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    getToken();
    getCategories();
  }, [getCategories, getToken]);

  const onGameStartedHandler = (gameOptions) => {
    setGameStarted(true);
    setGameOptions(gameOptions);
  };

  return (
    <div className={classes.gameContainer}>
      {gameStarted && <Question {...gameOptions} token={token} />}
      {!gameStarted && (
        <GameMenu
          onGameStarted={onGameStartedHandler}
          categories={categories}
          difficulties={difficulties}
          questionsTypes={questionsTypes}
          token={token}
          error={error}
        />
      )}
    </div>
  );
};

export default GameManager;
