import React, { useEffect, useState } from 'react';
import { Col, Row, message } from 'antd';
import styled from 'styled-components';
import TradeCard from '../TradeCard';

const TradeHistoryContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TradeHistory = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        const response = await fetch('/api/user/trade-history'); // Endpoint para obter o histórico de trocas
        if (!response.ok) throw new Error('Erro ao carregar histórico de trocas');
        const data = await response.json();
        setTrades(data.trades);
      } catch (error) {
        message.error(error.message);
      }
    };

    fetchTradeHistory();
  }, []);

  return (
    <TradeHistoryContainer role="region" aria-labelledby="trade-history-title">
      <h2 id="trade-history-title">Histórico de Trocas</h2>
      {trades.length > 0 ? (
        <Row gutter={16}>
          {trades.map((trade) => (
            <Col span={8} key={trade.id}>
              <TradeCard trade={trade} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>Nenhuma troca realizada até o momento.</p>
      )}
    </TradeHistoryContainer>
  );
};

export default TradeHistory;
