import apiRoutes from "../api";

export const getGamesList = async (page) => {
  return apiRoutes.bomb
    .getGamesList(page)
    .then((response) => Promise.resolve(response.data))
    .catch((e) => Promise.reject(e.response));
};

export const getPlatforms = async () => {
  return apiRoutes.bomb
    .getPlatforms()
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const searchGames = async (platform, game) => {
  return apiRoutes.bomb
    .searchGames(platform, game)
    .then((response) => Promise.resolve(response.data))
    .catch((e) => Promise.reject(e.response));
};
