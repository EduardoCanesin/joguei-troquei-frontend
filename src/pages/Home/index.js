// Home.js
import React, { useRef } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import AppHeader from '../../components/organisms/Header';
import Banner from '../../components/atoms/Banner';
import LoginForm from '../../components/molecules/LoginForm';
import Footer from '../../components/organisms/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
// import bannerImageLeft from './path/to/your/left-image.png'; // substitua pelo caminho correto
// import bannerImageRight from './path/to/your/right-image.png'; // substitua pelo caminho correto

const { Content } = Layout;

const HomeContainer = styled(Layout)`
  min-height: 100vh;
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
          // image={bannerImageLeft}
          gradient={true}
        />
        <Banner
          text="Troque jogos com outros jogadores!"
          // image={bannerImageRight}
          gradient={false}
        />
        <div>
          <Button type="primary" onClick={handleParticiparClick}>
            Participar
          </Button>
        </div>
        <div ref={loginFormRef} id='login-form'>
          <LoginForm />
        </div>
      </Content>
      <Footer />
    </HomeContainer>
  );
};

export default Home;
