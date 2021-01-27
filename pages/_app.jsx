import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>CaKuiz - The Cake Quiz</title>
        <meta name="title" content="CaKuiz - The Cake Quiz" />
        <meta name="description" content="Teste os seus conhecimentos sobre bolos e demais sabores da confeitaria" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cakuiz.pmdpaula.vercel.app/" />
        <meta property="og:title" content="CaKuiz - The Cake Quiz" />
        <meta property="og:description" content="Teste os seus conhecimentos sobre bolos e demais sabores da confeitaria" />
        <meta property="og:image" content={db.bglogo} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cakuiz.pmdpaula.vercel.app/" />
        <meta property="twitter:title" content="CaKuiz - The Cake Quiz" />
        <meta property="twitter:description" content="Teste os seus conhecimentos sobre bolos e demais sabores da confeitaria" />
        <meta property="twitter:image" content={db.bglogo} />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Nerko+One&display=swap" rel="stylesheet" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
