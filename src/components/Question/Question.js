import React, { useEffect, useCallback, useState } from 'react';

import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';

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
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [areQuestionsLoaded, setAreQuestionsLoaded] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState('');
  const [showNextPageBtn, setShowNextPageBtn] = useState(false);

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

  const answerHandler = (selectedAnswer) => {
    if (!chosenAnswer) {
      setChosenAnswer(selectedAnswer);
      setTimeout(() => {
        setShowNextPageBtn(true);
      }, 1500);
    }
  };

  const getAnswerClassName = (answer) => {
    const { correct_answer } = questions[currentQuestion];
    const answerSelected = answer === chosenAnswer;
    const showCorrectAnswer = correct_answer === answer && chosenAnswer;

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

  const nextQuestionHandler = () => {
    setCurrentQuestion(currentQuestion + 1);
    setChosenAnswer('');
    if (currentQuestion + 1 < numQuestions - PRELOAD_NUMBER) {
      loadQuestions(1);
    }
    setShowNextPageBtn(false);
  };

  if (!areQuestionsLoaded) return <Spinner />;
  return (
    <>
      <h2 className={classes.question}>
        {questions[currentQuestion]?.question}
      </h2>
      <div className={classes.answersContainer}>
        {questions[currentQuestion]?.answers.map((answer) => {
          return (
            <Button
              className={getAnswerClassName(answer)}
              key={answer}
              onClick={() => answerHandler(answer)}
            >
              {answer}
            </Button>
          );
        })}
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
          Next
        </Button>
      </div>
    </>
  );
};

export default Question;
