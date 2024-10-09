import React, { useState } from 'react';
import { Modal, Button, Typography, message } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const GameImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

const GameModal = ({ isVisible, onClose, game }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCollection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: game.id }),
      });

      if (!response.ok) throw new Error('Falha ao adicionar à coleção');

      message.success(`${game.name} foi adicionado à sua coleção.`);
      onClose();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: game.id }),
      });

      if (!response.ok) throw new Error('Falha ao adicionar à lista de desejos');

      message.success(`${game.name} foi adicionado à sua lista de desejos.`);
      onClose();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Adicionar ${game?.name}`}
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      aria-labelledby="game-modal-title"
    >
      {game && (
        <>
          <GameImage src={game.imageUrl} alt={game.name} />
          <Title level={4} id="game-modal-title">{game.name}</Title>
          <Button
            type="primary"
            onClick={handleAddToCollection}
            loading={loading}
            style={{ marginRight: '8px' }}
          >
            Adicionar à Coleção
          </Button>
          <Button
            type="default"
            onClick={handleAddToWishlist}
            loading={loading}
          >
            Adicionar à Lista de Desejos
          </Button>
        </>
      )}
    </Modal>
  );
};

export default GameModal;
