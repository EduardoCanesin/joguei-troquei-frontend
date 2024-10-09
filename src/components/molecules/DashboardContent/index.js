import React from 'react';
import SearchComponent from '../SearchComponent';
import MyCollection from '../MyCollection';
import WishList from '../WishList';
import TradeGames from '../TradeGames';
import EditProfile from '../EditProfile';
import TradeHistory from '../TradeHistory';

// Componentes que serão renderizados

const Trocas = () => <div>Componente Trocas</div>;

const Content = ({ current }) => {
  const renderComponent = () => {
    switch (current) {
      case 'procurar-jogos':
        return <SearchComponent />;
      case 'minha-colecao':
        return <MyCollection />;
      case 'lista-de-desejos':
        return <WishList />;
      case 'trocas':
        return <Trocas />;
      case 'historico-de-trocas':
        return <TradeHistory />;
      case 'jogos-para-trocas':
        return <TradeGames />;
      case 'editar-perfil':
        return <EditProfile />;
      default:
        return <SearchComponent />;
    }
  };

  return <div style={{ padding: '20px' }}>{renderComponent()}</div>;
};

export default Content;
