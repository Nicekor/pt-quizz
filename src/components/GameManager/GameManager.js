import React, { useState, useCallback, useEffect, useContext } from 'react';

import Question from '../Question/Question';
import GameMenu from '../GameMenu/GameMenu';
import FinalScreen from '../FinalScreen/FinalScreen';
import Error from '../UI/Error/Error';
import Spinner from '../UI/Spinner/Spinner';

import uiLabel from '../../assets/uiLabel.json';
import classes from './gameManager.module.css';
import { LanguageContext } from '../../context/LanguageContext';

const anyCategoryOption = { name: 'Any Category', id: '' };
const GameManager = () => {
  const { language } = useContext(LanguageContext);

  const [categories, setCategories] = useState([anyCategoryOption]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const difficulties = [
    { title: uiLabel.anyDifficulty[language], value: '' },
    { title: uiLabel.easy[language], value: 'easy' },
    { title: uiLabel.medium[language], value: 'medium' },
    { title: uiLabel.hard[language], value: 'hard' },
  ]; // these values are hardcoded because the api doesn't provide these
  const questionsTypes = [
    { title: uiLabel.anyType[language], value: '' },
    { title: uiLabel.multipleChoice[language], value: 'multiple' },
    {
      title: `${uiLabel.true[language]}/${uiLabel.false[language]}`,
      value: 'boolean',
    },
  ]; // hardcoded for the same reason as the difficulties
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOptions, setGameOptions] = useState({});
  const [token, setToken] = useState('');
  const [tokenLoading, setTokenLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [fadeOutClass, setFadeOutClass] = useState(null);
  const [score, setScore] = useState(0);

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
    setTokenLoading(false);
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const res = await fetch('https://opentdb.com/api_category.php');
      const { trivia_categories } = await res.json();
      setCategories([anyCategoryOption, ...trivia_categories]);
    } catch (err) {
      setError(err);
    }
    setCategoriesLoading(false);
  }, []);

  useEffect(() => {
    getToken();
    getCategories();
  }, [getCategories, getToken]);

  const onGameStartedHandler = (gameOptions) => {
    setGameStarted(true);
    setGameOptions(gameOptions);
  };

  const onCorrectAnswer = useCallback(() => setScore((score) => score + 1), []);

  const onGameOver = () => {
    setFadeOutClass(classes.fadeOut);
    setTimeout(() => {
      setIsGameOver(true);
    }, 1100); //todo: this delay depends on the fadeOut animation duration, find a better way to do this
  };

  const onPlayAgain = () => {
    setGameStarted(false);
    setIsGameOver(false);
    setFadeOutClass(null);
    setScore(0);
  };

  if (categoriesLoading || tokenLoading) return <Spinner />;
  if (error) return <Error err={error} />;
  if (isGameOver)
    return (
      <FinalScreen
        score={score}
        numQuestions={gameOptions.numQuestions}
        onPlayAgain={onPlayAgain}
      />
    );

  return (
    <div className={[classes.gameContainer, fadeOutClass].join(' ')}>
      {gameStarted && (
        <Question
          {...gameOptions}
          token={token}
          onGameOver={onGameOver}
          onCorrectAnswer={onCorrectAnswer}
        />
      )}
      {!gameStarted && (
        <GameMenu
          onGameStarted={onGameStartedHandler}
          categories={categories}
          difficulties={difficulties}
          questionsTypes={questionsTypes}
        />
      )}
    </div>
  );
};

export default GameManager;
