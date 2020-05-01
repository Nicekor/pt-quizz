import React from 'react';

import Button from '../UI/Button/Button';

import classes from './answer.module.css';

const Answer = ({
  answer,
  correctAnswer,
  chosenAnswer,
  onAnswerChosen,
  ...props
}) => {
  const getAnswerClassName = () => {
    const answerSelected = answer === chosenAnswer;
    const showCorrectAnswer = correctAnswer === answer && chosenAnswer;

    const answerChosenClass =
      answerSelected || showCorrectAnswer ? classes.answer : '';
    const correctAnswerClass = showCorrectAnswer ? classes.correctAnswer : '';
    const incorrectAnswerClass =
      answerSelected && !showCorrectAnswer ? classes.incorrectAnswer : '';
    return [
      classes.answerBtn,
      answerChosenClass,
      correctAnswerClass,
      incorrectAnswerClass,
    ].join(' ');
  };

  return (
    <Button
      className={getAnswerClassName(answer)}
      onClick={() => onAnswerChosen(answer)}
      {...props}
    >
      {answer}
    </Button>
  );
};

export default Answer;
