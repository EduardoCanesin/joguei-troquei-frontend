import React from 'react';
import styled from 'styled-components';
import RegistrationForm from '../../components/molecules/RegisterForm';
import AppHeader from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import { useNavigate } from 'react-router-dom';

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f0f2f5;
  min-height: 100vh; /* Garante que a página ocupe a altura total da tela */
`;

const RegistrationTitle = styled.h1`
  margin-bottom: 20px;
  color: #1d284c; /* Cor do título */
`;

const RegistrationPage = () => {
  const navigate = useNavigate();

  const scrollToLoginForm = () => {
    navigate('/#login-form');
  };

  return (
    <>
      <AppHeader onLoginClick={scrollToLoginForm} />
      <RegistrationContainer>
        <RegistrationTitle id="registration-title">Cadastro de Novo Usuário</RegistrationTitle>
        <RegistrationForm aria-labelledby="registration-title" />
      </RegistrationContainer>
      <Footer />
    </>
  );
};

export default RegistrationPage;
