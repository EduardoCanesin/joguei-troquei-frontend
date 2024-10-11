import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f0f0f0;
`;

const SidebarMenu = styled(Menu)`
  background-color: transparent;
  color: black;
  border-right: none;
`;

const MenuItem = styled(Menu.Item)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
`;

const Sidebar = ({ current, onMenuClick }) => {
  return (
    <SidebarContainer role="navigation" aria-label="Menu de navegação lateral">
      <SidebarMenu
        mode="inline"
        selectedKeys={[current]}
        onClick={onMenuClick}
        aria-label="Menu de navegação"
      >
        <MenuItem key="procurar-jogos" aria-label="Procurar Jogos">Procurar Jogos</MenuItem>
        <MenuItem key="minha-colecao" aria-label="Minha Coleção">Minha Coleção</MenuItem>
        <MenuItem key="lista-de-desejos" aria-label="Lista de Desejos">Lista de Desejos</MenuItem>
        <MenuItem key="trocas" aria-label="Trocas">Trocas</MenuItem>
        <MenuItem key="historico-de-trocas" aria-label="Histórico de Trocas">Histórico de Trocas</MenuItem>
        <MenuItem key="jogos-para-trocas" aria-label="Jogos para Trocas">Jogos para Trocas</MenuItem>
        <MenuItem key="editar-perfil" aria-label="Editar Perfil">Editar Perfil</MenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
