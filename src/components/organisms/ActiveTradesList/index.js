import React, { useEffect, useState } from 'react';
import TradeCard from '../../molecules/TradeCard';
import styled from 'styled-components';
import { message } from 'antd';

// Estilos adicionais com styled-components
const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

const EmptyMessage = styled.p`
  font-size: 18px;
  color: #999;
  text-align: center;
  margin-top: 50px;
`;

const ActiveTradesList = () => {
  const [trades, setTrades] = useState([]);

  // Função para carregar as trocas ativas do backend
  useEffect(() => {
    fetch('/api/trades/active')
      .then((response) => response.json())
      .then((data) => setTrades(data))
      .catch((error) => console.error('Error fetching trades:', error));
  }, []);

  const handleAccept = (tradeId) => {
    fetch(`/api/trades/accept/${tradeId}`, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        message.success('Troca aceita com sucesso!');
        // Atualizar o estado para refletir a troca aceita
        setTrades((prevTrades) =>
          prevTrades.map((trade) =>
            trade.id === tradeId ? { ...trade, status: 'accepted' } : trade
          )
        );
      })
      .catch((error) => {
        message.error('Falha ao aceitar a troca.');
        console.error(error);
      });
  };

  const handleReject = (tradeId) => {
    fetch(`/api/trades/reject/${tradeId}`, { method: 'POST' })
      .then((response) => response.json())
      .then(() => {
        message.success('Troca recusada com sucesso!');
        // Remover a troca recusada da lista
        setTrades((prevTrades) => prevTrades.filter((trade) => trade.id !== tradeId));
      })
      .catch((error) => {
        message.error('Falha ao recusar a troca.');
        console.error(error);
      });
  };

  const handleComment = (tradeId, comment) => {
    return fetch(`/api/trades/comment/${tradeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => response.json())
      .then((newComment) => {
        message.success('Comentário enviado com sucesso!');
        return newComment; // Retorna o novo comentário para ser adicionado
      })
      .catch((error) => {
        message.error('Falha ao enviar o comentário.');
        console.error(error);
      });
  };

  return (
    <Container>
      {trades.length === 0 ? (
        <EmptyMessage aria-live="polite" role="alert">
          Nenhuma troca ativa no momento. Você pode iniciar uma nova.
        </EmptyMessage>
      ) : (
        trades.map((trade) => (
          <TradeCard
            key={trade.id}
            trade={trade}
            onAccept={handleAccept}
            onReject={handleReject}
            onComment={handleComment}
          />
        ))
      )}
    </Container>
  );
};

export default ActiveTradesList;
