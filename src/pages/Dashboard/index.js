import React, { useState } from 'react';
import Sidebar from '../../components/molecules/DashboardMenu';
import Content from '../../components/molecules/DashboardContent';
import styled from 'styled-components';


const AppContainer = styled.div`
  display: flex;
`;

const Dashboard = () => {
  const [current, setCurrent] = useState('procurar-jogos');

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <AppContainer>
      <Sidebar current={current} onMenuClick={handleMenuClick} />
      <Content current={current} />
    </AppContainer>
  );
}

export default Dashboard;