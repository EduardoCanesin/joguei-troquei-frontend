import { useLocation } from 'react-router-dom';

const useIsHome = () => {
  const location = useLocation();
  return location.pathname === '/'; // Verifica se o caminho é "/"
};

export default useIsHome;