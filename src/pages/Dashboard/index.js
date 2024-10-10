import React, { useState } from 'react';
import AppHeader from '../../components/organisms/Header';
import Sidebar from '../../components/molecules/DashboardMenu';
import Content from '../../components/organisms/DashboardContent';
import styled from 'styled-components';
import Footer from '../../components/organisms/Footer';


const AppContainer = styled.div`
  display: flex;
`;

const Dashboard = () => {
  const [current, setCurrent] = useState('procurar-jogos');

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <AppHeader />
      <AppContainer>
        <Sidebar current={current} onMenuClick={handleMenuClick} />
        <Content current={current} />
      </AppContainer>
      <Footer />
    </>
  );
}

export default Dashboard;