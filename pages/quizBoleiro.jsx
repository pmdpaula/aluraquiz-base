import { useEffect, useState } from 'react';
import db from '../db.json';
import CakeText from '../src/components/CakeText/index';
import QuizBackground from '../src/components/QuizBackground/index';
import { QuizContainer } from '../src/components/QuizContainer/QuizContainer';
import QuizLogo from '../src/components/QuizLogo/index';
import Widget from '../src/components/Widget/index';
import Button from '../src/components/Button/Button';
import Toast from '../src/components/Toast/Toast';

// import { ReactComponent as checkIcon } from '../src/assets/icons/check.svg';
// import { ReactComponent as errorIcon } from '../src/assets/icons/error.svg';
import checkIcon from '../src/assets/icons/check.svg';
// import errorIcon from '../src/assets/icons/error.svg';
// import infoIcon from '../src/assets/icons/info.svg';
// import warningIcon from '../src/assets/icons/warning.svg';

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
  const [playerName, setPlayerName] = useState('Fulano');
  const questionIndex = currentQuestion;
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  const [list, setList] = useState([]);
  const [position, setPosition] = useState('bottom-right');
  const [autoDeleteTime, setAutoDeleteTime] = useState(4000);
  let toastProperties = null;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setTimeout(() => {
      setPlayerName(urlParams.get('playerName'));
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  const showToast = (type) => {
    const id = Math.floor((Math.random() * 101) + 1);

    switch (type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Parabéns',
          description: 'Você acertou x questões.',
          backgroundColor: '#5cb85c',
          // icon: checkIcon,
        };
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: 'This is a error toast component',
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
        showToast('success');
        setScreenState(screenStates.RESULT);
        setCurrentQuestion(0);
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
