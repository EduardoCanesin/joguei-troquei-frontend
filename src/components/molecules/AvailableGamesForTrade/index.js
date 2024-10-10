import React, { useState, useEffect } from 'react';
import { Card, Col, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const { Meta } = Card;

const GamesContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const GameCard = styled(Card)`
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const EmptyMessage = styled.p`
  font-size: 18px;
  text-align: center;
  color: #888;
  margin-top: 20px;
`;

const AvailableGamesForTrade = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableGames = async () => {
      try {
        const response = await axios.get('/api/games/available-for-trade'); // Exemplo de chamada de backend
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Erro ao carregar os jogos disponíveis para troca.');
        setLoading(false);
      }
    };

    fetchAvailableGames();
  }, []);

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`); // Navega para a página de detalhes do jogo
  };

  if (loading) {
    return <p role="status">Carregando jogos disponíveis...</p>;
  }

  return (
    <GamesContainer>
      {games.length > 0 ? (
        <Row gutter={[16, 16]} aria-live="polite">
          {games.map((game) => (
            <Col
              key={game.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              aria-label={`Jogo disponível: ${game.name}`}
            >
              <GameCard
                hoverable
                cover={<img src={game.imageUrl} alt={`Capa do jogo ${game.name}`} />}
                onClick={() => handleGameClick(game.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleGameClick(game.id);
                }}
                aria-describedby={`game-desc-${game.id}`}
              >
                <Meta
                  title={game.name}
                  id={`game-desc-${game.id}`}
                  description={`Disponível para troca`}
                />
              </GameCard>
            </Col>
          ))}
        </Row>
      ) : (
        <EmptyMessage role="alert">Nenhum jogo disponível para troca no momento.</EmptyMessage>
      )}
    </GamesContainer>
  );
};

export default AvailableGamesForTrade;
