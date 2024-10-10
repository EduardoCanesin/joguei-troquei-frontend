import React, { useState, useEffect } from 'react';
import { Card, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const { Meta } = Card;

const GameDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const GameDetails = () => {
  const { gameId } = useParams(); // Obtém o ID do jogo da URL
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`/api/games/${gameId}`); // Chamada de backend para obter os dados do jogo
        setGameData(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Erro ao carregar os dados do jogo.');
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (loading) {
    return (
      <LoadingWrapper>
        <Spin size="large" role="status" aria-label="Carregando detalhes do jogo" />
      </LoadingWrapper>
    );
  }

  if (!gameData) {
    return <p role="alert">Não foi possível carregar os detalhes do jogo.</p>;
  }

  return (
    <GameDetailsContainer>
      <StyledCard
        hoverable
        cover={<img src={gameData.imageUrl} alt={`Capa do jogo ${gameData.name}`} />}
        role="region"
        aria-labelledby="game-title"
        aria-describedby="game-description"
      >
        <Meta
          title={gameData.name}
          id="game-title"
          description={gameData.description || 'Nenhuma descrição disponível.'}
          // id="game-description"
        />
      </StyledCard>
    </GameDetailsContainer>
  );
};

export default GameDetails;
