import React, { useEffect, useCallback, useState } from 'react';

import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';
import Answer from '../Answer/Answer';
import Error from '../UI/Error/Error';

import classes from './question.module.css';

const MAX_QUESTIONS_PER_REQUEST = 50;
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
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState('');
  const [showNextPageBtn, setShowNextPageBtn] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [error, setError] = useState(null);

  const currentQuestionNum = currentQuestionIndex + 1;
  const questionProps = questions[currentQuestionIndex];
  const correctAnswer = questionProps?.correct_answer;
  const question = questionProps?.question;
  const answers = questionProps?.answers || [];

  const loadQuestions = useCallback(
    async (questionsAmount) => {
      try {
        setIsQuestionLoading(true);
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${questionsAmount}&category=${category}&difficulty=${difficulty}&type=${questionsType}&token=${token}`
        );
        const { results } = await res.json();
        setQuestions((questions) => [
          ...questions,
          ...getFormattedQuestions(results),
        ]);
      } catch (err) {
        setError(err);
      }
      setIsQuestionLoading(false);
    },
    [category, difficulty, questionsType, token]
  );

  useEffect(() => {
    if (currentQuestionIndex % MAX_QUESTIONS_PER_REQUEST === 0) {
      loadQuestions(
        Math.min(numQuestions - currentQuestionIndex, MAX_QUESTIONS_PER_REQUEST)
      );
    }
  }, [currentQuestionIndex, loadQuestions, numQuestions]);

  // last question
  useEffect(() => {
    if (currentQuestionNum === numQuestions) {
      setIsLastQuestion(true);
    }
  }, [currentQuestionNum, numQuestions]);

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
    setCurrentQuestionIndex(currentQuestionNum);
    setChosenAnswer('');
    setShowNextPageBtn(false);
  };

  if (isQuestionLoading) return <Spinner />;
  if (error) return <Error err={error} />;
  return (
    <>
      <h2 className={classes.question}>
        {currentQuestionNum}. {question}
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
          onClick={isLastQuestion ? onGameOver : nextQuestionHandler}
          disabled={!showNextPageBtn}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </Button>
      </div>
    </>
  );
};

export default Question;
