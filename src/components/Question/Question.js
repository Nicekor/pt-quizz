import React, { useEffect, useCallback, useState } from 'react';

import Spinner from '../UI/Spinner/Spinner';

import classes from './question.module.css';
import Button from '../UI/Button/Button';

const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const parseHTMLEncoding = (str) =>
  new DOMParser().parseFromString(str, 'text/html').body.textContent;

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

  const getQuestion = useCallback(async () => {
    const questionsAmount = Math.min(numQuestions, 10);
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${questionsAmount}&category=${category}&difficulty=${difficulty}&type=${questionsType}&token=${token}`
      );
      const { results } = await res.json();
      setQuestions(
        results.map(
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
        )
      );
    } catch (err) {
      console.error(err);
    }
    setAreQuestionsLoaded(true);
  }, [category, difficulty, numQuestions, questionsType, token]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  if (!areQuestionsLoaded) return <Spinner />;
  return (
    <>
      <h2 className={classes.question}>
        {questions[currentQuestion]?.question}
      </h2>
      <div className={classes.answersContainer}>
        {questions[currentQuestion]?.answers.map((answer) => (
          <Button className={classes.answerBtn} key={answer}>
            {answer}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Question;
