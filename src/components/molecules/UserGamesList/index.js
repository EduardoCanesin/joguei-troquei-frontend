import React, { useState } from 'react';
import { Tabs, Modal, Button, Select, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

// Estilos adicionais com styled-components
const TabsContainer = styled.div`
  margin-top: 20px;
`;

const GameItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const GameInfo = styled.div`
  margin-left: 20px;
`;

const TradeButton = styled(Button)`
  background-color: #ffbb00;
  color: #fff;
  &:hover {
    background-color: #e6a800;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #666;
`;

// Componente de lista de jogos
const GamesList = ({ games, isOwner, onRequestTrade }) => (
  <div>
    {games.length === 0 ? (
      <EmptyMessage aria-live="polite">Nenhum jogo nesta lista.</EmptyMessage>
    ) : (
      games.map((game) => (
        <GameItem key={game.id}>
          <Avatar size={80} src={game.image} alt={`Imagem do jogo ${game.name}`} />
          <GameInfo>
            <Typography.Text>{game.name}</Typography.Text>
            {!isOwner && onRequestTrade && (
              <TradeButton icon={<PlusSquareOutlined />} onClick={() => onRequestTrade(game)}>
                Solicitar Troca
              </TradeButton>
            )}
          </GameInfo>
        </GameItem>
      ))
    )}
  </div>
);

// Componente principal de abas de listas de jogos
const UserGamesLists = ({ userGames, isOwner }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [availableGames, setAvailableGames] = useState([]); // Lista de jogos para troca do usuário visualizador
  const [selectedTradeGame, setSelectedTradeGame] = useState(null);

  const handleRequestTrade = (game) => {
    setSelectedGame(game);
    // Carregar lista de jogos disponíveis para troca do usuário que está visualizando
    fetch('/api/user/available-games')
      .then((response) => response.json())
      .then((data) => setAvailableGames(data));
    setModalVisible(true);
  };

  const handleSendTradeRequest = () => {
    // Lógica para enviar solicitação de troca
    fetch('/api/trades/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestedGameId: selectedGame.id,
        offeredGameId: selectedTradeGame,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        Modal.success({ content: 'Solicitação de troca enviada com sucesso!' });
      })
      .catch(() => {
        Modal.error({ content: 'Falha ao enviar a solicitação de troca.' });
      });
    setModalVisible(false);
  };

  return (
    <TabsContainer>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Jogos para Troca" key="1">
          <GamesList games={userGames.trade} isOwner={isOwner} onRequestTrade={isOwner ? null : handleRequestTrade} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lista de Desejos" key="2">
          <GamesList games={userGames.wishlist} isOwner={isOwner} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Coleção de Jogos" key="3">
          <GamesList games={userGames.collection} isOwner={isOwner} />
        </Tabs.TabPane>
      </Tabs>

      <Modal
        visible={isModalVisible}
        title={`Trocar ${selectedGame?.name}`}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleSendTradeRequest}>
            Enviar Proposta de Troca
          </Button>,
        ]}
      >
        <p>Escolha um jogo seu para trocar com {selectedGame?.name}:</p>
        <Select
          style={{ width: '100%' }}
          onChange={(value) => setSelectedTradeGame(value)}
          placeholder="Selecione um jogo"
        >
          {availableGames.map((game) => (
            <Select.Option key={game.id} value={game.id}>
              {game.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </TabsContainer>
  );
};

export default UserGamesLists;
