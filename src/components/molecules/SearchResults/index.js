import React, { useState } from 'react';
import styled from 'styled-components';
import { List, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import GameModal from '../GameModal';

const ResultsContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const { Title } = Typography;

const SearchResults = ({ results }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const showModal = (game) => {
    setSelectedGame(game);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedGame(null);
  };

  if (!results || results.length === 0) {
    return (
      <ResultsContainer role="alert" aria-live="polite">
        <Title level={4}>Nenhum resultado encontrado.</Title>
      </ResultsContainer>
    );
  }

  return (
    <ResultsContainer role="region" aria-labelledby="search-results-title">
      <Title id="search-results-title" level={4}>Resultados da Busca:</Title>
      <List
        itemLayout="horizontal"
        dataSource={results}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a href={`/games/${item.id}`} aria-label={`Ver detalhes do jogo ${item.name}`}>
                  {item.name}
                </a>
              }
              description={`Plataforma: ${item.platform}`}
            />
            <PlusSquareOutlined
              onClick={() => showModal(item)}
              style={{ fontSize: '24px', color: '#1D284C', cursor: 'pointer', marginLeft: '16px' }}
              aria-label={`Adicionar ${item.name} à coleção`}
            />
          </List.Item>
        )}
      />
      
      <GameModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        game={selectedGame}
      />
    </ResultsContainer>
  );
};

export default SearchResults;
