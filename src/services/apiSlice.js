import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spotify-api-wrapper.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'your-api-key');
      headers.set('X-RapidAPI-Host', 'spotify-api-wrapper.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/tracks' }),
    getSongsBySearch: builder.query({ 
      query: (searchTerm) => `/search?query=${searchTerm}` 
    }),
    getSongsByGenre: builder.query({ 
      query: (genre) => `/genre/${genre}` 
    }),
    getSongDetails: builder.query({ 
      query: ({ songid }) => `/track/details?id=${songid}` 
    }),
  }),
});

export const { 
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
} = apiSlice;