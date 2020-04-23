import React, { useState, useEffect } from 'react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import classes from './gameMenu.module.css';

const GameMenu = ({
  onGameStarted,
  token,
  error,
  categories,
  difficulties,
  questionsTypes,
}) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState('10');
  const [questionsType, setQuestionsType] = useState('');

  useEffect(() => {
    setCategory(categories[0].id);
  }, [categories]);

  const changeCategory = ({ target: { value } }) => {
    setCategory(value);
  };

  const changeDifficulty = ({ target: { value } }) => {
    setDifficulty(value);
  };

  const changeNumQuestions = ({ target: { value } }) => {
    setNumQuestions(value);
  };

  const changeQuestionsType = ({ target: { value } }) => {
    setQuestionsType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGameStarted({
      category,
      difficulty,
      numQuestions,
      questionsType,
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!token || !categories.length) {
    return <Spinner />;
  }
  const categoryOptions = categories.map(({ id, name }) => {
    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });
  const difficultiesOptions = difficulties.map(({ title, value }) => {
    return (
      <option key={value} value={value}>
        {title}
      </option>
    );
  });
  const questionsTypeOptions = questionsTypes.map(({ title, value }) => {
    return (
      <option key={value} value={value}>
        {title}
      </option>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.row}>
        <Input
          labelName="Category:"
          Component="select"
          icon={faArrowDown}
          onChange={changeCategory}
          value={category}
        >
          {categoryOptions}
        </Input>
        <Input
          labelName="Difficulty:"
          Component="select"
          icon={faArrowDown}
          onChange={changeDifficulty}
          value={difficulty}
        >
          {difficultiesOptions}
        </Input>
      </div>
      <div className={classes.row}>
        <Input
          type="number"
          labelName="Number of Questions:"
          min="10"
          max="100"
          onChange={changeNumQuestions}
          value={numQuestions}
        />
        <Input
          labelName="Type of Questions:"
          Component="select"
          icon={faArrowDown}
          onChange={changeQuestionsType}
          value={questionsType}
        >
          {questionsTypeOptions}
        </Input>
      </div>
      <Button type="submit" style={{ margin: '0 auto' }}>
        Start Game
      </Button>
    </form>
  );
};

export default GameMenu;
