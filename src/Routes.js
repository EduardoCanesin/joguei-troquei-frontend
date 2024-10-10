import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Main from './pages/Main';
import GameDetailPage from './pages/GameDetailPage';

function App() {
  // PrivateRoute component to protect routes
  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/" />;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/*Remover essas rotas e voltar ao private routes abaixo */}
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/main" element={<Main />} />
          <Route path="/game-info/:id" element={<GameDetailPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />}>
            <Route path="user/:id" element={<UserDetails />} />
          </Route> */}

          {/* Private routes */}
          {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/profile/:id" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/main" element={<PrivateRoute element={<Main />} />} />
          <Route path="/game-info/:id" element={<PrivateRoute element={<GameDetailPage />} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
