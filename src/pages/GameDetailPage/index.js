import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import GameDetails from '../../components/molecules/GameDetais';
import UsersWithGame from '../../components/molecules/UsersWithGame';
import AppHeader from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

const GameDetailContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const GameDetailPage = () => {
  const { gameId } = useParams(); // Pega o gameId da URL

  return (
    <>
      <AppHeader />
      <GameDetailContainer>
        <h1>Detalhes do Jogo</h1>
        <GameDetails gameId={gameId} />
        <h2>Usuários com este jogo</h2>
        <UsersWithGame gameId={gameId} />
      </GameDetailContainer>
      <Footer />
    </>
  );
};

export default GameDetailPage;
