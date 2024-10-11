import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Main from './pages/Main';
import GameDetailPage from './pages/GameDetailPage';

function App() {
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

          {/* Private routes */}
          <Route path="/dashboard/:id" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/profile/:id" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/main" element={<PrivateRoute element={<Main />} />} />
          <Route path="/game-info/:id" element={<PrivateRoute element={<GameDetailPage />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
