import apiRoutes from "../api";

export const getCollection = async (token) => {
  return apiRoutes.collection
    .getCollection(token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const getCollectionByUserId = async (userId, token) => {
  return apiRoutes.collection
  .getCollectionByUserId(userId, token)
  .then((response) => Promise.resolve(response))
  .catch((e) => Promise.reject(e.response));
};

export const deleteGameFromCollection = async (collectionId, token) => {
  return apiRoutes.collection
    .deleteGameFromCollection(collectionId, token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const addGameInCollection = async (gameId, token) => {
  return apiRoutes.collection
    .addGameInCollection(gameId, token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const updateTradeStatus = async (collectionId, token) => {
  return apiRoutes.collection
    .updateTradeStatus(collectionId, token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};
