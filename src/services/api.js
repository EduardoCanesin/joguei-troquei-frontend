import axios from './axios';

const apiRoutes = {
  users: {
    getUserByUsername: (username, token) => {
      return axios.get(`/usuarios/getUser?username=${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    },

    createNewUser: (payload) => {
      return axios.post('/usuarios/', payload)
    }, 




    // getAllUsers: () => axios.get('/'),
  
    // getUserById: (userId) => axios.get(`/${userId}/`),

    // createUser: (userData) => axios.post('/', userData),
  
    // updateUser: ({ userId, userData }) => axios.put(`/${userId}/`, userData),
  
    // updatePartialUser: ({ userId, userData }) => axios.patch(`/${userId}/`, userData),
  
    // deleteUser: (userId) => axios.delete(`/${userId}/`)
  },
  games: {

  },
  trades: {

  },
  token: {
    createToken: ({ username, password }) => {
      return axios.post('/token/', { username, password });
    },
    
    getToken: () => axios.get('/token/csrf/'),

    refreshToken: () => axios.post('/token/refresh')
  }


};

export default apiRoutes;
