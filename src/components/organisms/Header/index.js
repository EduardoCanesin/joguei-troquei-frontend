import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined, HomeOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;

// Styled Components
const StyledHeader = styled(Header)`
  background-color: #1D284C;
  padding: 0 20px;
`;

const Logo = styled.img`
  height: 40px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: 2px solid white;
  }
`;

const ProfileMenuWrapper = styled.div`
  position: relative;
`;

const ProfileMenu = styled(Menu)`
  position: absolute;
  right: 0;
  top: 50px; // ajuste da posição
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const AppHeader = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  // Verifica se o usuário está logado
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleMenuClick = (key) => {
    if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'dashboard') {
      navigate('/dashboard');
    } else if (key === 'main') {
      navigate('/main');
    }
  };

  return (
    <StyledHeader>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo src="/path/to/logo.png" alt="Logotipo da empresa" />

        <HeaderRight>
          {isLoggedIn ? (
            <>
              {/* Ícone Home */}
              <IconButton
                onClick={() => handleMenuClick('main')}
                aria-label="Ir para a página principal"
              >
                <HomeOutlined style={{ color: 'white', fontSize: '24px' }} role="img" aria-hidden="false" />
              </IconButton>

              {/* Ícone de Perfil com Dropdown */}
              <ProfileMenuWrapper>
                <IconButton
                  onClick={() => setMenuVisible(!menuVisible)}
                  aria-haspopup="true"
                  aria-expanded={menuVisible}
                  aria-controls="profile-menu"
                >
                  <Avatar
                    icon={<UserOutlined style={{ color: 'white' }} />}
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    aria-label="Menu do usuário"
                  />
                </IconButton>
                {menuVisible && (
                  <ProfileMenu
                    id="profile-menu"
                    onClick={({ key }) => handleMenuClick(key)}
                    items={[
                      {
                        key: 'profile',
                        label: 'Perfil',
                      },
                      {
                        key: 'dashboard',
                        label: 'Painel de Controle',
                      },
                    ]}
                    role="menu"
                    aria-label="Opções do perfil do usuário"
                  />
                )}
              </ProfileMenuWrapper>

              {/* Ícone Logout */}
              <IconButton
                onClick={handleLogout}
                aria-label="Sair"
              >
                <LogoutOutlined style={{ color: 'white', fontSize: '24px' }} role="img" aria-hidden="false" />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={onLoginClick}
              aria-label="Fazer login"
            >
              <LoginOutlined style={{ color: 'white', fontSize: '24px' }} />
            </IconButton>
          )}
        </HeaderRight>
      </div>
    </StyledHeader>
  );
};

export default AppHeader;
