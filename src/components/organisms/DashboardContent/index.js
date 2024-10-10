import React from 'react';
import SearchComponent from '../../molecules/SearchComponent';
import MyCollection from '../../molecules/MyCollection';
import WishList from '../../molecules/WishList';
import TradeGames from '../../molecules/TradeGames';
import EditProfile from '../../molecules/EditProfile';
import TradeHistory from '../../molecules/TradeHistory';
import ActiveTradesList from '../ActiveTradesList';


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
        return <ActiveTradesList />;
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
