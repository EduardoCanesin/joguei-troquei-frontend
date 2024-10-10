import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';

// Estilos adicionais com styled-components
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

const UserInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const UserMessage = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #666;
  max-width: 600px;
  text-align: center;
`;

const UserProfileData = ({ user }) => {
  const { name, city, state, profilePicture, message } = user;

  return (
    <ProfileContainer>
      <Avatar size={120} src={profilePicture} alt={`Foto de perfil de ${name}`} />
      <UserInfo>
        <Typography.Title level={3}>{name}</Typography.Title>
        <Typography.Text>{`${city}, ${state}`}</Typography.Text>
      </UserInfo>
      <UserMessage aria-live="polite">{message || 'Este usuário ainda não escreveu uma mensagem.'}</UserMessage>
    </ProfileContainer>
  );
};

export default UserProfileData;
