import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const StatusBar = styled.div`
  height: 4px;
  border-radius: 4px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'sucesso':
        return 'green';
      case 'cancelada':
        return 'orange';
      case 'recusada':
        return 'red';
      default:
        return 'gray';
    }
  }};
`;

const GameImage = styled.img`
  width: 100%;
  height: auto;
`;

const TradeHistoryCard = ({ trade }) => {
  return (
    <Card style={{ marginBottom: '16px' }}>
      <StatusBar status={trade.status} aria-label={`Status da troca: ${trade.status}`} />
      <h3>{trade.partnerName}</h3>
      <div>
        <h4>Jogos Trocados</h4>
        {trade.games.map((game) => (
          <div key={game.id}>
            <GameImage src={game.imageUrl} alt={`Imagem do jogo ${game.name}`} />
            <p>{game.name}</p>
          </div>
        ))}
      </div>
      <p aria-label={`Status da troca: ${trade.status}`}>{trade.status}</p>
    </Card>
  );
};

export default TradeHistoryCard;
