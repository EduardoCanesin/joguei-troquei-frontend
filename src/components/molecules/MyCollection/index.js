import React, { useEffect, useState } from 'react';
import { List, Modal, Typography, message } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, SwapOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CollectionContainer = styled.div`
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

const MyCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch('/api/collection'); // Endpoint para obter jogos da coleção
        if (!response.ok) throw new Error('Erro ao carregar a coleção');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, []);

  const handleDeleteGame = async (gameId) => {
    try {
      const response = await fetch(`/api/collection/${gameId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir o jogo da coleção');

      message.success('Jogo excluído com sucesso.');
      setGames(games.filter(game => game.id !== gameId));
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleAddToSwap = async (gameId) => {
    try {
      const response = await fetch('/api/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) throw new Error('Erro ao adicionar o jogo à lista de troca');

      message.success('Jogo adicionado à lista de troca com sucesso.');
    } catch (error) {
      message.error(error.message);
    }
  };

  const confirmDelete = (gameId) => {
    Modal.confirm({
      title: 'Tem certeza que deseja excluir este jogo da sua coleção?',
      onOk: () => handleDeleteGame(gameId),
      okText: 'Sim',
      cancelText: 'Não',
      okType: 'danger',
    });
  };

  return (
    <CollectionContainer role="region" aria-labelledby="my-collection-title">
      <Title id="my-collection-title" level={4}>Minha Coleção</Title>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {games.length === 0 ? (
            <EmptyMessage role="alert" aria-live="assertive">
              Você não possui jogos na sua coleção. Adicione alguns para começar!
            </EmptyMessage>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={games}
              renderItem={item => (
                <List.Item
                  actions={[
                    <DeleteOutlined 
                      onClick={() => confirmDelete(item.id)} 
                      aria-label={`Excluir ${item.name} da coleção`} 
                    />,
                    <SwapOutlined 
                      onClick={() => handleAddToSwap(item.id)} 
                      aria-label={`Adicionar ${item.name} à lista de troca`} 
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
    </CollectionContainer>
  );
};

export default MyCollection;
