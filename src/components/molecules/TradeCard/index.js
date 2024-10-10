import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Input, List, message } from 'antd';
import { PlusSquareOutlined, CommentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { TextArea } = Input;

// Estilos com styled-components
const StyledCard = styled(Card)`
  background-color: #f9f9f9;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const GameDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const CommentsSection = styled.div`
  margin-top: 10px;
`;

const TradeCard = ({ trade, onAccept, onReject, onComment }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Carregar os comentários do backend quando o componente é montado
  useEffect(() => {
    fetch(`/api/trades/comments/${trade.id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, [trade.id]);

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    onReject(trade.id); // Atualiza o status da troca para "recusada"
    setShowRejectModal(false);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    onAccept(trade.id); // Atualiza o status da troca para "aceita"
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim() === '') {
      message.error('O comentário não pode estar vazio.');
      return;
    }

    // Envia o comentário para o backend
    onComment(trade.id, comment).then((newComment) => {
      // Atualiza a lista de comentários
      setComments([...comments, newComment]);
      setComment(''); // Limpa o campo de comentário
    });
  };

  return (
    <StyledCard
      aria-label={`Trade request for ${trade.requestedGame.name}`}
      title={isAccepted ? 'Troca Aceita' : 'Solicitação de Troca'}
    >
      <GameDetails>
        <GameInfo>
          <StyledImage src={trade.requesterGame.image} alt={trade.requesterGame.name} />
          <p>{`Meu jogo: ${trade.requesterGame.name}`}</p>
        </GameInfo>

        <PlusSquareOutlined />

        <GameInfo>
          <StyledImage src={trade.requestedGame.image} alt={trade.requestedGame.name} />
          <p>{`Jogo oferecido: ${trade.requestedGame.name}`}</p>
        </GameInfo>
      </GameDetails>

      {!isAccepted ? (
        <>
          <p>
            {`Aceita trocar o meu ${trade.requesterGame.name} pelo seu ${trade.requestedGame.name}?`}
          </p>
          <ButtonGroup>
            <Button type="primary" onClick={handleAccept}>
              Aceitar
            </Button>
            <Button type="danger" onClick={handleReject}>
              Recusar
            </Button>
          </ButtonGroup>

          <Modal
            visible={showRejectModal}
            onCancel={() => setShowRejectModal(false)}
            onOk={confirmReject}
            title="Confirmar Rejeição"
            aria-label="Confirmar rejeição da troca"
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <p>Tem certeza que deseja recusar esta troca?</p>
          </Modal>
        </>
      ) : (
        <CommentsSection aria-labelledby="comment-section">
          <h3 id="comment-section">Comentários</h3>

          {/* Exibe os comentários já feitos */}
          <List
            dataSource={comments}
            renderItem={(item) => (
              <li>
                {/* <Comment
                  author={item.author}
                  content={item.content}
                  aria-label={`Comentário de ${item.author}`}
                /> */}
              </li>
            )}
          />

          {/* Área para adicionar novos comentários */}
          <TextArea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Deixe um comentário"
            aria-label="Digite seu comentário sobre a troca"
          />
          <Button type="primary" onClick={handleSubmitComment}>
            Enviar
          </Button>
        </CommentsSection>
      )}
    </StyledCard>
  );
};

export default TradeCard;
