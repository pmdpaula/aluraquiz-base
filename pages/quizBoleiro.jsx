/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

import { useEffect, useState } from 'react';
import db from '../db.json';
import CakeText from '../src/components/CakeText/index';
import QuizBackground from '../src/components/QuizBackground/index';
import { QuizContainer } from '../src/components/QuizContainer/QuizContainer';
import QuizLogo from '../src/components/QuizLogo/index';
import Widget from '../src/components/Widget/index';
import Button from '../src/components/Button/Button';
import Toast from '../src/components/Toast/Toast';
import AlternativesForm from '../src/components/AlternativesForm/AlternativesForm';

const BUTTON_PROPS = [
  {
    id: 1,
    type: 'success',
    className: 'success',
    label: 'Success',
  },
  {
    id: 2,
    type: 'danger',
    className: 'danger',
    label: 'Danger',
  },
  {
    id: 3,
    type: 'info',
    className: 'info',
    label: 'Info',
  },
  {
    id: 4,
    type: 'warning',
    className: 'warning',
    label: 'Warning',
  },
];

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>
    <Widget.Content>
      [Desafio do loading]
    </Widget.Content>
  </Widget>
);

const ResultWidget = ({ results }) => {
  const qtyRigthQuestion = results.filter((x) => x).length;

  const createMessageResult = () => {
    if (qtyRigthQuestion > 1) {
      return `Você acertou ${qtyRigthQuestion} perguntas.`;
    }
    if (qtyRigthQuestion === 1) {
      return `Você acertou ${qtyRigthQuestion} pergunta.`;
    }

    return 'Parece que não sabes nada de confeitaria. Nenhum acerto!';
  };

  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>
      <Widget.Content>
        <p>
          {createMessageResult()}
        </p>
        <ul>
          {results.map((result, resultIdx) => (
            <li key={`result_${resultIdx}`}>
              Questão
              {' '}
              {(`00${resultIdx + 1}`).slice(-2)}
              :
              {result === true
                ? ' Acertou'
                : ' Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
};

const QuestionWidget = ({
  question,
  questionIndex,
  totalQuestions,
  autoDeleteTime,
  onSubmit,
  addResult,
  showToast,
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);

  const isCorret = selectedAlternative === question.answer;
  const questionId = `question_${questionIndex}`;
  const hasAlternativeSelected = selectedAlternative !== undefined;

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

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);

            isCorret
              ? showToast('success', 'Parabéns! Acertou a questão.')
              : showToast('danger', 'Resposta errada.');

            setTimeout(() => {
              addResult(isCorret);
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
              onSubmit();
            }, autoDeleteTime);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const selectedAlternatives = isCorret ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && selectedAlternatives}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  style={{ display: 'none' }}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>

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
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerName, setPlayerName] = useState('Fulano');

  const questionIndex = currentQuestion;
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  // toast values
  const [list, setList] = useState([]);
  const [position, setPosition] = useState('bottom-right');
  const [autoDeleteTime, setAutoDeleteTime] = useState(2500);
  let toastProperties = null;

  const addResult = (result) => {
    setResults([...results, result]);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setTimeout(() => {
      setPlayerName(urlParams.get('playerName'));
      setScreenState(screenStates.QUIZ);
    }, 0.2 * 1000);
  }, []);

  const showToast = (type, descriptionReceived) => {
    const id = Math.floor((Math.random() * 101) + 1);

    switch (type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Parabéns',
          description: descriptionReceived,
          backgroundColor: '#5cb85c',
          // icon: checkIcon,
        };
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: descriptionReceived,
          backgroundColor: '#d9534f',
          // icon: errorIcon,
        };
        break;
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: 'This is an info toast component',
          backgroundColor: '#5bc0de',
          // icon: infoIcon,
        };
        break;
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: 'This is a warning toast component',
          backgroundColor: '#f0ad4e',
          // icon: warningIcon,
        };
        break;

      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };

  const handleSubmitQuiz = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.LOADING);

      setTimeout(() => {
        setScreenState(screenStates.RESULT);
        setCurrentQuestion(0);
      }, 0.5 * 1000);
    }
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        <CakeText>{`Oi ${playerName}, jogando o Quiz Boleiro`}</CakeText>
        {screenState === screenStates.QUIZ
            && (
              <QuestionWidget
                question={question}
                totalQuestions={totalQuestions}
                questionIndex={questionIndex}
                onSubmit={handleSubmitQuiz}
                showToast={showToast}
                autoDeleteTime={autoDeleteTime}
                addResult={addResult}
              />
            )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
        && <ResultWidget results={results} setResults={setResults} />}

        <Toast
          toastList={list}
          position={position}
          autoDeleteTime={autoDeleteTime}
        />
      </QuizContainer>
    </QuizBackground>
  );
};

export default QuizBoleiro;
