/* eslint-disable no-unused-vars */
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  // const [db, setDb] React.useState({})
  // React.useEffect(() => {
  // });
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
    // {/* <pre style={{ color: 'black' }}>
    //   {JSON.stringify(dbExterno.questions, null, 4)}
    // </pre> */}
  );
}

export async function getServerSideProps(context) {
  const [projectName, projectOwner] = context.query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${projectName}.${projectOwner}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
