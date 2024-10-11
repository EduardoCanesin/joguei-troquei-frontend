import GlobalStyle from './styles/global';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Routes';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <GlobalStyle />
      <App />
    </UserProvider>
  </React.StrictMode>
);
