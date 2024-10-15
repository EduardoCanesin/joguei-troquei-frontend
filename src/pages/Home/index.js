import React, { useRef } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import AppHeader from '../../components/organisms/Header';
import Banner from '../../components/atoms/Banner';
import LoginForm from '../../components/molecules/LoginForm';
import Footer from '../../components/organisms/Footer';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/atoms/Button';
import bannerImageLeft from '../../assets/images/logo.svg';
// import bannerImageRight from './path/to/your/right-image.png'; // substitua pelo caminho correto

const { Content } = Layout;

const HomeContainer = styled(Layout)`
  min-height: 100vh;
`;

const StyledParticipate = styled.div`
display: flex;
    justify-content: center;
    padding-bottom: 50px;
    background-color: white;
`;

const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Home = () => {
  const navigate = useNavigate();
  const loginFormRef = useRef(null);

  const scrollToLoginForm = () => {
    if (loginFormRef.current) {
      loginFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleParticiparClick = () => {
    navigate('/register');
  };

  return (
    <HomeContainer>
      <AppHeader onLoginClick={scrollToLoginForm} />
      <Content>
        <Banner
          text="Bem-vindo ao Joguei Troquei!"
          image={bannerImageLeft}
          gradient={true}
        />
        <Banner
          text="Troque jogos com outros jogadores!"
          // image={bannerImageRight}
          gradient={false}
        />
        <StyledParticipate>
          <CustomButton text="Participar" onClick={handleParticiparClick} />
        </StyledParticipate>
        <StyledLogin ref={loginFormRef} id='login-form'>
          <h3>Faça o seu Login</h3>
          <LoginForm />
        </StyledLogin>
      </Content>
      <Footer />
    </HomeContainer>
  );
};

export default Home;
