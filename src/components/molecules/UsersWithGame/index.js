import React, { useEffect, useState } from 'react';
import { List, Avatar, Spin, message } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const UsersWithGame = ({ gameId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersWithGame = async () => {
      try {
        const response = await axios.get(`/api/games/${gameId}/users`); // Chamada para buscar usuários que possuem o jogo
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Erro ao carregar os usuários que possuem este jogo.');
        setLoading(false);
      }
    };

    fetchUsersWithGame();
  }, [gameId]);

  if (loading) {
    return (
      <LoadingWrapper>
        <Spin size="large" role="status" aria-label="Carregando usuários com o jogo" />
      </LoadingWrapper>
    );
  }

  if (users.length === 0) {
    return <p role="alert">Nenhum usuário encontrado com este jogo.</p>;
  }

  return (
    <UsersContainer>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <a key="profile" onClick={() => navigate(`/profile/${user.id}`)} aria-label={`Ver perfil de ${user.name}`}>
                Ver Perfil
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.profileImageUrl} alt={`Foto de perfil de ${user.name}`} />}
              title={<a onClick={() => navigate(`/profile/${user.id}`)}>{user.name}</a>}
            />
          </List.Item>
        )}
      />
    </UsersContainer>
  );
};

export default UsersWithGame;
