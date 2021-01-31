import React from 'react';
import QuizScreen from '../../source/screens/Quiz';
import { ThemeProvider } from 'styled-components';

export default function QuizDaGaleraPage({ dbExterno }) {
  console.log(dbExterno)
  return (
    <div>
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen externalQuestions={dbExterno.questions} externalBg={dbExterno.bg} />
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((serverResponse) => {
        if (serverResponse.ok) {
          return serverResponse.json();
        }
        throw new Error('Falha em obter os dados');
      })
      .then((objectResponse) => {
        return objectResponse;
      })
    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
