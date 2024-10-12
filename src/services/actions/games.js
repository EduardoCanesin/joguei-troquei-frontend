import apiRoutes from "../api";

export const getCollection = async (token) => {
  return apiRoutes.games
    .getCollection(token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const getCollectionByUserId = async (userId, token) => {
  return apiRoutes.games
  .getCollectionByUserId(userId, token)
  .then((response) => Promise.resolve(response))
  .catch((e) => Promise.reject(e.response));
};

export const deleteGameFromCollection = async (collectionId, token) => {
  return apiRoutes.games
    .deleteGameFromCollection(collectionId, token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const addGameInCollection = async (gameId, token) => {
  return apiRoutes.games
    .addGameInCollection(gameId, token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const updateTradeStatus = async (collectionId, token) => {
  return apiRoutes.games
    .updateTradeStatus(collectionId, token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};
