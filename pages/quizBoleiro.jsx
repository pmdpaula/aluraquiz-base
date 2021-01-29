import { useEffect, useState } from 'react';
import db from '../db.json';
import CakeText from '../src/components/CakeText/index';
import QuizBackground from '../src/components/QuizBackground/index';
import { QuizContainer } from '../src/components/QuizContainer/QuizContainer';
import QuizLogo from '../src/components/QuizLogo/index';
import Widget from '../src/components/Widget/index';
import Button from '../src/components/Button/Button';

const LoadingScreen = () => (
  <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>
    <Widget.Content>
      [Desafio do loading]
    </Widget.Content>
  </Widget>
);

const QuestionWidget = ({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) => {
  const questionId = `question_${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <CakeText>
          {`Questão ${questionIndex + 1} - ${` ${totalQuestions}`}`}
        </CakeText>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <form onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">
            Confirmar
          </Button>

        </form>

      </Widget.Content>
    </Widget>
  );
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const QuizBoleiro = () => {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];
  const [playerName, setPlayerName] = useState('Fulano');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setTimeout(() => {
      setPlayerName(urlParams.get('playerName'));
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  const handleSubmitQuiz = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.LOADING);

      setTimeout(() => {
        setScreenState(screenStates.RESULT);
      }, 1 * 1000);
    }
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        <CakeText>{`Oi ${playerName}, estamos jogando o Quiz Boleiro`}</CakeText>
        {screenState === screenStates.QUIZ
            && (
            <QuestionWidget
              question={question}
              totalQuestions={totalQuestions}
              questionIndex={questionIndex}
              onSubmit={handleSubmitQuiz}
            />
            )}

        {screenState === screenStates.LOADING && <LoadingScreen />}

        {screenState === screenStates.RESULT && <div>Você acertou x questões. Parabéns!</div>}

      </QuizContainer>
    </QuizBackground>
  );
};

export default QuizBoleiro;
