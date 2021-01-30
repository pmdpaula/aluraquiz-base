/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
import { useState, useEffect } from 'react';
import { Lottie } from '@crello/react-lottie';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import { QuizContainer } from '../../components/QuizContainer/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm/AlternativesForm';
import Button from '../../components/Button/Button';
import BackLinkArrow from '../../components/BackLinkArrow/BackLinkArrow';
import Toast from '../../components/Toast/Toast';
import CakeText from '../../components/CakeText/index';
import loadingAnimation from './animations/loadingCakes.json';

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
        <CakeText>Resultado</CakeText>
      </Widget.Header>
      <Widget.Content>
        <p>
          {createMessageResult()}
        </p>
        <ul>
          {results.map((result, resultIdx) => {
            const resultKey = `result_${resultIdx}`;
            return (
              <li key={resultKey}>
                Questão
                {' '}
                {(`00${resultIdx + 1}`).slice(-2)}
                :
                {result === true
                  ? ' Acertou'
                  : ' Errou'}
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
};

const LoadingWidget = ({ titleText }) => (
  <Widget>
    <Widget.Header>
      <CakeText>{titleText}</CakeText>
    </Widget.Header>

    <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
      <Lottie
        width="200px"
        height="200px"
        className="lottie-container basic"
        config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
      />
    </Widget.Content>
  </Widget>
);

const QuestionWidget = ({
  question,
  questionIndex,
  totalQuestions,
  timeoutValue,
  onSubmit,
  addResult,
  showToast,
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);

  const isCorrect = selectedAlternative === question.answer;
  const questionId = `question__${questionIndex}`;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
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
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);

            isCorrect
              ? showToast('success', 'Resposta correta.')
              : showToast('danger', 'Resposta errada.');

            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, timeoutValue);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
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
const QuizPage = ({
  externalQuestions,
  externalBg,
}) => {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerName, setPlayerName] = useState('Fulano');

  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bgImage = externalBg;

  // toast values
  const [list, setList] = useState([]);
  const position = 'bottom-right';
  const timeoutValue = 2500;
  let toastProperties = null;

  function addResult(result) {
    // results.push(result);
    setResults([...results, result]);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setTimeout(() => {
      if (urlParams.get('playerName') !== null) {
        setPlayerName(urlParams.get('playerName'));
      }

      setScreenState(screenStates.QUIZ);
    }, timeoutValue);
  }, []);

  const handleSubmitQuiz = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.LOADING);

      setTimeout(() => {
        setScreenState(screenStates.RESULT);
        setCurrentQuestion(0);
      }, timeoutValue);
    }
  };

  const showToast = (type, descriptionReceived) => {
    const id = Math.floor((Math.random() * 101) + 1);

    switch (type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Parabéns!',
          description: descriptionReceived,
          backgroundColor: '#5cb85c',
          // icon: checkIcon,
        };
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Errado!',
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

  return (
    <QuizBackground backgroundImage={bgImage}>
      <QuizContainer>
        <QuizLogo />
        <CakeText>{`Oi ${playerName}, jogando o Quiz Boleiro`}</CakeText>

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            showToast={showToast}
            timeoutValue={timeoutValue}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget titleText="Computando" />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

        <Toast
          toastList={list}
          position={position}
          timeoutValue={timeoutValue}
        />

      </QuizContainer>
    </QuizBackground>
  );
};

export default QuizPage;
