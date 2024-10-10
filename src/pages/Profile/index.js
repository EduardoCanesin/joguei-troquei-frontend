// import React from 'react';
// import { useParams } from 'react-router-dom';

// const Profile = () => {
//   const { id } = useParams();  // Captura o valor de ":id" da URL

//   return (
//     <div>
//       <h1>Perfil do Usuário</h1>
//       <p>ID do usuário: {id}</p>
//     </div>
//   );
// }

// export default Profile;


import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import UserProfileData from '../../components/molecules/UserProfileData';
import UserGamesLists from '../../components/molecules/UserGamesList';
import AppHeader from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

const ProfilePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f2f5;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userGames, setUserGames] = useState({
    trade: [],
    wishlist: [],
    collection: [],
  });
  const [isOwner, setIsOwner] = useState(false);

  // Função para carregar os dados do usuário e as listas de jogos
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obter o ID do usuário logado (exemplo usando localStorage)
        const activeUserId = localStorage.getItem('activeUserId'); // Exemplo: pode vir de um contexto de autenticação

        // Simulação de chamada à API para buscar os dados do usuário
        const userData = await fetch(`/api/users/${userId}`).then((res) => res.json());
        setUser(userData);

        // Simulação de chamada à API para buscar as listas de jogos
        const gamesData = await fetch(`/api/users/${userId}/games`).then((res) => res.json());
        setUserGames({
          trade: gamesData.trade,
          wishlist: gamesData.wishlist,
          collection: gamesData.collection,
        });

        // Verificar se o usuário ativo é o mesmo do perfil que está sendo visualizado
        if (activeUserId && parseInt(activeUserId) === userId) {
          setIsOwner(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <>
      <AppHeader />
      <ProfilePageContainer>
        {user && <UserProfileData user={user} />}
        <UserGamesLists userGames={userGames} isOwner={isOwner} />
      </ProfilePageContainer>
      <Footer />
    </>
  );
};

export default Profile;
