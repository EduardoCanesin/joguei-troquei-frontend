import React, { useEffect, useState } from 'react';
import { Select, Button, message } from 'antd';
import styled from 'styled-components';
import SearchResults from '../SearchResults'; // Importando o componente de resultados

const { Option } = Select;

// Styled Components
const SearchContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: #FFBB00;
  color: black;

  &:hover {
    background-color: #e6a600;
  }
`;

const SearchComponent = () => {
  const [platforms, setPlatforms] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // Estado para os resultados da busca

  // Carregar plataformas do backend
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch('/api/platforms');
        const data = await response.json();
        setPlatforms(data);
      } catch (error) {
        message.error('Erro ao carregar plataformas');
      }
    };

    fetchPlatforms();
  }, []);

  // Carregar jogos do backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        message.error('Erro ao carregar jogos');
      }
    };

    fetchGames();
  }, []);

  // Manipulação do botão de busca
  const handleSearch = async () => {
    if (!selectedPlatform || !selectedGame) {
      message.error('Por favor, selecione a plataforma e o nome do jogo');
      return;
    }

    try {
      const response = await fetch(`/api/search?platform=${selectedPlatform}&game=${selectedGame}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar jogos');
      }
      const result = await response.json();
      setSearchResults(result); // Armazenar os resultados da busca

      message.success('Busca realizada com sucesso!');
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <SearchContainer role="search" aria-label="Componente de busca">
        <Select
          placeholder="Selecione a Plataforma"
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={setSelectedPlatform}
          aria-label="Selecionar Plataforma"
        >
          {platforms.map(platform => (
            <Option key={platform.id} value={platform.name}>
              {platform.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Digite o nome do jogo"
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={setSelectedGame}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          aria-label="Selecionar Nome do Jogo"
        >
          {games.map(game => (
            <Option key={game.id} value={game.name}>
              {game.name}
            </Option>
          ))}
        </Select>

        <StyledButton type="primary" onClick={handleSearch}>
          Buscar
        </StyledButton>
      </SearchContainer>

      {/* Renderiza os resultados da busca */}
      <SearchResults results={searchResults} />
    </>
  );
};

export default SearchComponent;
