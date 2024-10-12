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
    getGamesList: () => axios.get('/bomb/games'),

    getPlatforms: () => axios.get('/bomb/platforms'),

    searchGames: () => axios.get('/bomb/search'),

    getCollection: (token) => axios.get('/collection/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

    getCollectionByUserId: (userId, token) => axios.get(`/collection/?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

    deleteGameFromCollection: (collectionId, token) => axios.delete(`/collection/${collectionId}/delete_game/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),

    addGameInCollection: (gameId, token) => axios.post('/collection/add_game/', 
      { game_id: gameId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ),   

    updateTradeStatus: (collectionId, token) => axios.patch(
      `/collection/${collectionId}/update_trade_status/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

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
