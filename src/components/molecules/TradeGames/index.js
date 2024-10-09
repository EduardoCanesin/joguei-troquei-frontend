import React, { useEffect, useState } from 'react';
import { List, Modal, Typography, message } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TradeGamesContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GameImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  padding: 20px;
`;

const TradeGames = () => {
  const [tradeGames, setTradeGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTradeGames = async () => {
      try {
        const response = await fetch('/api/trade-games'); // Endpoint para obter a lista de jogos para troca
        if (!response.ok) throw new Error('Erro ao carregar a lista de jogos para troca');
        const data = await response.json();
        setTradeGames(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTradeGames();
  }, []);

  const handleDeleteGame = async (gameId) => {
    try {
      const response = await fetch(`/api/trade-games/${gameId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir o jogo da lista de troca');

      message.success('Jogo excluído com sucesso.');
      setTradeGames(tradeGames.filter(game => game.id !== gameId));
    } catch (error) {
      message.error(error.message);
    }
  };

  const confirmDelete = (gameId) => {
    Modal.confirm({
      title: 'Tem certeza que deseja excluir este jogo da sua lista de troca?',
      onOk: () => handleDeleteGame(gameId),
      okText: 'Sim',
      cancelText: 'Não',
      okType: 'danger',
    });
  };

  return (
    <TradeGamesContainer role="region" aria-labelledby="my-trade-games-title">
      <Title id="my-trade-games-title" level={4}>Jogos para Troca</Title>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {tradeGames.length === 0 ? (
            <EmptyMessage role="alert" aria-live="assertive">
              Você não possui jogos para troca. Adicione alguns para começar!
            </EmptyMessage>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={tradeGames}
              renderItem={item => (
                <List.Item
                  actions={[
                    <DeleteOutlined 
                      onClick={() => confirmDelete(item.id)} 
                      aria-label={`Excluir ${item.name} da lista de jogos para troca`} 
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href={`/games/${item.id}`} aria-label={`Ver detalhes do jogo ${item.name}`}>{item.name}</a>}
                    description={<GameImage src={item.imageUrl} alt={item.name} />}
                  />
                </List.Item>
              )}
            />
          )}
        </>
      )}
    </TradeGamesContainer>
  );
};

export default TradeGames;
