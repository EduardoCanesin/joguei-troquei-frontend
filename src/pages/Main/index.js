import React, { useState } from 'react';
import styled from 'styled-components';
import AvailableGamesForTrade from '../../components/molecules/AvailableGamesForTrade';
import SearchComponent from '../../components/molecules/SearchComponent';
import AppHeader from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

const AvailableGamesContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
`;

const Main = () => {
  // const [searchResults, setSearchResults] = useState([]); // Armazena os resultados da busca

  // const handleSearchResults = (results) => {
  //   setSearchResults(results); // Atualiza os resultados da busca
  // };

  return (
    <>
      <AppHeader />
      <AvailableGamesContainer>
        <SearchComponent />
        <h1>Jogos Disponíveis para Troca</h1>
        <AvailableGamesForTrade />
      </AvailableGamesContainer>
      <Footer />
    </>
  );
};

export default Main;
