import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();  // Captura o valor de ":id" da URL

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>ID do usuário: {id}</p>
    </div>
  );
}

export default Profile;