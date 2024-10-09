import React, { useEffect, useState } from 'react';
import { List, Modal, Typography, message } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const WishlistContainer = styled.div`
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

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist'); // Endpoint para obter a lista de desejos
        if (!response.ok) throw new Error('Erro ao carregar a lista de desejos');
        const data = await response.json();
        setWishList(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleDeleteGame = async (gameId) => {
    try {
      const response = await fetch(`/api/wishlist/${gameId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir o jogo da lista de desejos');

      message.success('Jogo excluído com sucesso.');
      setWishList(wishList.filter(game => game.id !== gameId));
    } catch (error) {
      message.error(error.message);
    }
  };

  const confirmDelete = (gameId) => {
    Modal.confirm({
      title: 'Tem certeza que deseja excluir este jogo da sua lista de desejos?',
      onOk: () => handleDeleteGame(gameId),
      okText: 'Sim',
      cancelText: 'Não',
      okType: 'danger',
    });
  };

  return (
    <WishlistContainer role="region" aria-labelledby="my-wishlist-title">
      <Title id="my-wishlist-title" level={4}>Lista de Desejos</Title>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {wishList.length === 0 ? (
            <EmptyMessage role="alert" aria-live="assertive">
              Você não possui jogos na sua lista de desejos. Adicione alguns para começar!
            </EmptyMessage>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={wishList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <DeleteOutlined 
                      onClick={() => confirmDelete(item.id)} 
                      aria-label={`Excluir ${item.name} da lista de desejos`} 
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
    </WishlistContainer>
  );
};

export default WishList;
