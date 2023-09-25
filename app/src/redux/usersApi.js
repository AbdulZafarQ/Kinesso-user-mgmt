// src/api/users.js
const baseUrl = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${baseUrl}/users`;

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addUserAPI = async (userData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserAPI = async (userId, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw await response.json();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
