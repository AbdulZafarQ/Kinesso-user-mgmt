// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUserAPI, deleteUserAPI, fetchUsers, updateUserAPI } from "./usersApi";

export const fetchUsersAsync = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchUsers();
});

export const addUserAsync = createAsyncThunk("users/addUser", async (userData) => {
  return await addUserAPI(userData);
});

export const updateUserAsync = createAsyncThunk("users/updateUser", async ({ userId, userData }) => {
  return await updateUserAPI(userId, userData);
});

export const deleteUserAsync = createAsyncThunk("users/deleteUser", async (userId) => {
  await deleteUserAPI(userId);
  return userId;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.filter((user) => user._id !== userId);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
