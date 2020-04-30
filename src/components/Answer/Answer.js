import React, { useCallback } from 'react';

import Button from '../UI/Button/Button';

import classes from './answer.module.css';

const Answer = ({
  answer,
  correctAnswer,
  chosenAnswer,
  answerHandler,
  ...props
}) => {
  const getAnswerClassName = useCallback(() => {
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
  }, [answer, chosenAnswer, correctAnswer]);

  return (
    <Button
      className={getAnswerClassName(answer)}
      onClick={() => answerHandler(answer)}
      {...props}
    >
      {answer}
    </Button>
  );
};

export default Answer;
