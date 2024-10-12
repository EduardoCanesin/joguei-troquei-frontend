import React, { useEffect, useState } from 'react';
import { List, Modal, Typography, message } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, SwapOutlined } from '@ant-design/icons';
import { deleteGameFromCollection, getCollection, updateTradeStatus } from '../../../services/actions/games';
import getToken from '../../../utils/getToken';

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
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = getToken();
  
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await getCollection(token)
        //if (!response) throw new Error('Erro ao carregar a coleção');
        const data = await response.json();
        setCollection(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, []);

  const handleDeleteGame = async (collectionId) => {
    try {
      const response = await deleteGameFromCollection(collectionId, token);

      if (!response.ok) throw new Error('Erro ao excluir o jogo da coleção');

      message.success('Jogo excluído com sucesso.');
      setCollection(collection.filter(game => game.id !== collectionId));
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleAddToTradeList = async (collectionId) => {
    try {
      const response = await updateTradeStatus(collectionId, token);
      if (response.ok) {
        message.success("Jogo adicionado à lista de troca com sucesso.");
      } else {
        throw new Error("Erro ao adicionar o jogo à lista de troca.");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  
  const confirmDelete = (collectionId) => {
    Modal.confirm({
      title: 'Tem certeza que deseja excluir este jogo da sua coleção?',
      onOk: () => handleDeleteGame(collectionId),
      okText: 'Sim',
      cancelText: 'Não',
      okType: 'danger',
    });
  };
  
  const confirmAddToTradeList = (collectionId, gameName) => {
    Modal.confirm({
      title: `Tem certeza que deseja adicionar ${gameName} à lista de troca?`,
      onOk: () => handleAddToTradeList(collectionId),
      okText: "Sim",
      cancelText: "Não",
      okType: "primary",
    });
  };

  return (
    <CollectionContainer role="region" aria-labelledby="my-collection-title">
      <Title id="my-collection-title" level={4}>Minha Coleção</Title>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {collection.length === 0 ? (
            <EmptyMessage role="alert" aria-live="assertive">
              Você não possui jogos na sua coleção. Adicione alguns para começar!
            </EmptyMessage>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={collection}
              renderItem={item => (
                <List.Item
                  actions={[
                    <DeleteOutlined 
                      onClick={() => confirmDelete(item.id)} 
                      aria-label={`Excluir ${item.name} da coleção`} 
                    />,
                    <SwapOutlined
                      onClick={() => confirmAddToTradeList(item.id, item.name)}
                      aria-label={`Adicionar ${item.name} à lista de troca`}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href={`/game-info/${item.id}`} aria-label={`Ver detalhes do jogo ${item.name}`}>{item.name}</a>}
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
