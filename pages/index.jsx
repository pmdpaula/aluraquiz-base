import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import CakeText from '../src/components/CakeText';
import Input from '../src/components/Input/Input';
import Button from '../src/components/Button/Button';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <CakeText>{db.title}</CakeText>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <CakeText>Mundo Boleiro</CakeText>
          </Widget.Header>
          <Widget.Content>
            <Widget.FormGame onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quizBoleiro?playerName=${playerName}`);
              // eslint-disable-next-line no-console
              console.log('Fazendo submissão do formulário');
            }}
            >
              <Input
                placeholder="Como te chamaremos?"
                onChange={(event) => {
                  setPlayerName(event.target.value);
                }}
              />
              <Button type="submit" disabled={playerName.length <= 1}>
                Jogar!
              </Button>
            </Widget.FormGame>

          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/pmdpaula" />
    </QuizBackground>
  );
}
