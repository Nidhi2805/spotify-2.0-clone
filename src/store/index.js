import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import playerReducer from '../features/playerSlice';
import authReducer from '../features/authSlice';
import { authApi } from '../services/authApi';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    player: playerReducer,
    auth: authReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(apiSlice.middleware)
    .concat(authApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});