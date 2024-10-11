import apiRoutes from "../api";

export const getUserByUsername = async (username, token) => {
  return apiRoutes.users
    .getUserByUsername(username, token)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(e.response));
};

export const createNewUser = async (payload) => {
  return apiRoutes.users
    .createNewUser(payload)
    .then((response) => Promise.resolve(response))
    .catch((e) => Promise.reject(response));
}




export const getAllUsers = async () => {
  try {
    const response = await apiRoutes.users.getAllUsers();
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "An error occurred while fetching users");
  }
  
};

export const getUserById = async (userId) => {
  try {
    const response = await apiRoutes.users.getUserById(userId);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "An error occurred while fetching users");
  }
  
};

export const createUser = (userData) => {
  apiRoutes.users
    .createUser(userData)
    .then((response) => Promise.resolve(response.data))
    .catch((e) => Promise.reject(e.reponse));
};

export const updateUser = ({ userId, userData }) => {
  apiRoutes.users
    .updateUser({ userId, userData })
    .then((response) => Promise.resolve(response.data))
    .catch((e) => Promise.reject(e.reponse));
};

export const updatePartialUser = ({ userId, userData }) => {
  apiRoutes.users
    .updatePartialUser({ userId, userData })
    .then((response) => Promise.resolve(response.data))
    .catch((e) => Promise.reject(e.reponse));
};

export const deleteUser = (userId) => {
  apiRoutes.users
    .deleteUser(userId)
    .then((response) => Promise.resolve(response.data))
    .catch((e) => Promise.reject(e.reponse));
};