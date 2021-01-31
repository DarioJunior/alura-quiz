import React from 'react';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../source/components/Widget';
import Footer from '../source/components/Footer';
import GitHubCorner from '../source/components/GitHubCorner';
import QuizBackground from '../source/components/QuizBackground';
import QuizLogo from '../source/components/QuizLogo';
import Input from '../source/components/Input';
import Button from '../source/components/Button';
import QuizContainer from '../source/components/QuizContainer';
import Link from '../source/components/Link';
export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0.2, duration: 2 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>The legend of zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
                console.log('Fazendo uma submissão por meio do react');
              }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={({ target }) => setName(target.value)}
                placeholder="Diz ai seu nome... "
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar como: ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 2 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-150%' },
          }}
          initial="hidden"
          animate="show">
          <Widget.Header>
            <h1>Quizzes da Galera!</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercelapp', '')
                  .split('.');
                return (
                  <li key={linkExterno}>
                    <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/DarioJunior" />
    </QuizBackground>
  );
}
