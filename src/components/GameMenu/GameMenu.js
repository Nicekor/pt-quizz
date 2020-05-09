import React, { useState, useEffect, useContext } from 'react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import classes from './gameMenu.module.css';
import { LanguageContext } from '../../context/LanguageContext';
import uiLabel from '../../assets/uiLabel.json';

const GameMenu = ({
  onGameStarted,
  categories,
  difficulties,
  questionsTypes,
}) => {
  const { language } = useContext(LanguageContext);

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
      numQuestions: parseInt(numQuestions),
      questionsType,
    });
  };

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
          labelName={`${uiLabel.category[language]}:`}
          Component="select"
          icon={faArrowDown}
          onChange={changeCategory}
          value={category}
        >
          {categoryOptions}
        </Input>
        <Input
          labelName={`${uiLabel.difficulty[language]}:`}
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
          labelName={`${uiLabel.questionsNumber[language]}:`}
          min="10"
          max="100"
          onChange={changeNumQuestions}
          value={numQuestions}
        />
        <Input
          labelName={`${uiLabel.questionsType[language]}:`}
          Component="select"
          icon={faArrowDown}
          onChange={changeQuestionsType}
          value={questionsType}
        >
          {questionsTypeOptions}
        </Input>
      </div>
      <Button type="submit" centered>
        {uiLabel.startGame[language]}
      </Button>
    </form>
  );
};

export default GameMenu;
