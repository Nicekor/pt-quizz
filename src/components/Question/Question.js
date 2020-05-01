import React, { useEffect, useCallback, useState } from 'react';

import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';
import Answer from '../Answer/Answer';

import classes from './question.module.css';

const PRELOAD_NUMBER = 10;
const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const parseHTMLEncoding = (str) =>
  new DOMParser().parseFromString(str, 'text/html').body.textContent;

const getFormattedQuestions = (questions) =>
  questions.map(
    ({ incorrect_answers, correct_answer, question, ...result }) => {
      return {
        ...result,
        question: parseHTMLEncoding(question),
        correct_answer: parseHTMLEncoding(correct_answer),
        answers: shuffle([...incorrect_answers, correct_answer]).map(
          parseHTMLEncoding
        ),
      };
    }
  );

const Question = ({
  numQuestions,
  category,
  difficulty,
  questionsType,
  token,
  onGameOver,
  onCorrectAnswer,
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [areQuestionsLoaded, setAreQuestionsLoaded] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState('');
  const [showNextPageBtn, setShowNextPageBtn] = useState(false);
  const [nextPageBtnText, setNextPageBtnText] = useState('Next');

  const questionProps = questions[currentQuestionIndex];
  const correctAnswer = questionProps?.correct_answer;
  const question = questionProps?.question;
  const answers = questionProps?.answers || [];

  const loadQuestions = useCallback(
    async (questionsAmount) => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${questionsAmount}&category=${category}&difficulty=${difficulty}&type=${questionsType}&token=${token}`
        );
        const { results } = await res.json();
        setQuestions((questions) => [
          ...questions,
          ...getFormattedQuestions(results),
        ]);
      } catch (err) {
        console.error(err);
      }
      setAreQuestionsLoaded(true);
    },
    [category, difficulty, questionsType, token]
  );

  useEffect(() => {
    loadQuestions(Math.min(numQuestions, PRELOAD_NUMBER));
  }, [loadQuestions, numQuestions]);

  // last question
  useEffect(() => {
    if (currentQuestionIndex + 1 === numQuestions) {
      setNextPageBtnText('Finish');
    }
  }, [currentQuestionIndex, numQuestions]);

  // render game over screen
  useEffect(() => {
    if (currentQuestionIndex === numQuestions) {
      onGameOver();
    }
  }, [chosenAnswer, currentQuestionIndex, numQuestions, onGameOver]);

  useEffect(() => {
    if (correctAnswer === chosenAnswer) {
      onCorrectAnswer();
    }
  }, [chosenAnswer, correctAnswer, onCorrectAnswer]);

  const onAnswerChosen = (selectedAnswer) => {
    if (!chosenAnswer) {
      setChosenAnswer(selectedAnswer);
      setTimeout(() => {
        setShowNextPageBtn(true);
      }, 1500);
    }
  };

  const nextQuestionHandler = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setChosenAnswer('');
    if (currentQuestionIndex + 1 < numQuestions - PRELOAD_NUMBER) {
      loadQuestions(1);
    }
    setShowNextPageBtn(false);
  };

  if (!areQuestionsLoaded) return <Spinner />;

  return (
    <>
      <h2 className={classes.question}>
        {currentQuestionIndex + 1}. {question}
      </h2>
      <div className={classes.answersContainer}>
        {answers.map((answer) => (
          <Answer
            key={answer}
            answer={answer}
            onAnswerChosen={onAnswerChosen}
            chosenAnswer={chosenAnswer}
            correctAnswer={correctAnswer}
          />
        ))}
      </div>
      <div
        className={classes.expandable}
        style={showNextPageBtn ? { height: '50px' } : null}
      >
        <Button
          centered
          className={classes.nextPageBtn}
          onClick={nextQuestionHandler}
          disabled={!showNextPageBtn}
        >
          {nextPageBtnText}
        </Button>
      </div>
    </>
  );
};

export default Question;
