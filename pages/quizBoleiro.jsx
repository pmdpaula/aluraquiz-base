import db from '../db.json';
import CakeText from '../src/components/CakeText/index';
import QuizBackground from '../src/components/QuizBackground/index';
import { QuizContainer } from './Contribuidores/index';
import QuizLogo from '../src/components/QuizLogo/index';
import Widget from '../src/components/Widget/index';

const QuizBoleiro = () => (
  <QuizBackground backgroundImage={db.bg}>
    <QuizContainer>
      <QuizLogo />

      <CakeText>Quiz Boleiro</CakeText>
      <Widget>
        <Widget.Header>
          <CakeText>Questão 01</CakeText>
        </Widget.Header>
        <Widget.Content>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor.</p>
        </Widget.Content>
      </Widget>

      <Widget>
        <Widget.Header>
          <CakeText>Questão 02</CakeText>
        </Widget.Header>
        <Widget.Content>
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan
            disputationi eu sit. Vide electram sadipscing et per.
            Per aumento de cachacis, eu reclamis. Paisis, filhis, espiritis santis.
            Cevadis im ampola pa arma uma pindureta.

          </p>
        </Widget.Content>
      </Widget>

    </QuizContainer>
  </QuizBackground>
);

export default QuizBoleiro;
