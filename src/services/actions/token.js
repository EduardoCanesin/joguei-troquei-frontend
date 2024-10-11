import apiRoutes from "../api";

export const createToken = async ({ username, password }) => {
  return apiRoutes.token
    .createToken({ username, password })
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const getToken = async () => {
  return apiRoutes.token
    .getToken()
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(response))
}