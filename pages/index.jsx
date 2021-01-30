import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import { QuizContainer } from '../src/components/QuizContainer/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import CakeText from '../src/components/CakeText';
import Input from '../src/components/Input/Input';
import Button from '../src/components/Button/Button';
import Link from '../src/components/Link/Link';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.2 }}
        >
          <Widget.Header>
            <CakeText>{db.title}</CakeText>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.2 }}
        >
          <Widget.Header>
            <CakeText>Mundo Boleiro</CakeText>
          </Widget.Header>
          <Widget.Content>
            <Widget.FormGame onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?playerName=${playerName}`);
              // eslint-disable-next-line no-console
              console.log('Fazendo submissão do formulário');
            }}
            >
              <Input
                placeholder="Como te chamaremos?"
                onChange={(event) => {
                  setPlayerName(event.target.value);
                }}
                name="nomeDoUsuario"
                value={playerName}
              />
              <Button type="submit" disabled={playerName.length <= 1}>
                Jogar!
              </Button>
            </Widget.FormGame>

          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.2 }}
        >
          <Widget.Header>
            <CakeText>Quizes da Galera</CakeText>
          </Widget.Header>
          <Widget.Content>
            {/* <pre>
              {JSON.stringify(db.external, null, 4)}
            </pre> */}

            <ul>
              {db.external.map((externalLink, externalLinkId) => {
                const itemKey = `externalLink_${externalLinkId}`;
                const [projectName, projectOwner] = externalLink
                  .replace(/\/|https:|.vercel.app/g, '')
                  .split('.');

                return (
                  <li key={itemKey}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${projectOwner}`}
                      // href={externalLink}
                    >
                      <p style={{ fontSize: '1em', margin: '0' }}>
                        {projectName}
                      </p>
                      <p style={{ fontSize: '0.8em', margin: '0', textAlign: 'right' }}>
                        {projectOwner}
                      </p>
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.section}
          transition={{ delay: 4, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/pmdpaula" />
    </QuizBackground>
  );
}
