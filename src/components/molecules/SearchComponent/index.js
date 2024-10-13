import React, { useEffect, useState, useCallback } from 'react';
import { Input, Select, Button, message } from 'antd';
import styled from 'styled-components';
import SearchResults from '../SearchResults';
import { getGamesList, getPlatforms, searchGames } from '../../../services/actions/bomb';

const { Option } = Select;

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
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 

  console.log("jogos:", games)
  // Carregar plataformas do backend
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await getPlatforms();
        setPlatforms(response.data);
      } catch (error) {
        message.error('Erro ao carregar plataformas');
      }
    };

    fetchPlatforms();
  }, []);

  const fetchGames = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await getGamesList(page);
      if (!response) {
        setHasMore(false);
      } else {
        setGames((prevGames) => [...prevGames, ...response]);
      }
    } catch (error) {
      message.error('Erro ao carregar jogos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && hasMore) {
      fetchGames(page);
    }
  }, [page, hasMore, fetchGames]);


  const handlePopupScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Manipulação do botão de busca
  const handleSearch = async () => {
    // if (!selectedPlatform || !selectedGame) {
    //   message.error('Por favor, selecione a plataforma e o nome do jogo');
    //   return;
    // }

    try {
      const response = await searchGames(selectedPlatform, selectedGame);
      if (!response) {
        throw new Error('Erro ao buscar jogos');
      }
      setSearchResults(response.results);

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
          {platforms && platforms.map(platform => (
            <Option key={platform.id} value={platform.name}>
              {platform.name}
            </Option>
          ))}
        </Select>

        {/* <Select
          placeholder="Digite o nome do jogo"
          style={{ width: '100%', marginBottom: '10px' }}
          onChange={setSelectedGame}
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          onPopupScroll={handlePopupScroll}
          loading={loading}
          aria-label="Selecionar Nome do Jogo"
        >
          {games && games.map((game) => (
            <Option key={game.id} value={game.name}>
              {game.name}
            </Option>
          ))}
        </Select> */}

        {/* Input para o nome do jogo */}
        <Input
          placeholder="Digite o nome do jogo"
          style={{ width: '100%', marginBottom: '10px' }}
          value={selectedGame}  // Vincular o valor do input ao estado
          onChange={(e) => setSelectedGame(e.target.value)}  // Atualiza o estado ao digitar
          aria-label="Digite o nome do jogo"
        />

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
