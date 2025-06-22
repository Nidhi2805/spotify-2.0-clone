import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
        state.activeSong = action.payload.song;
        state.currentSongs = action.payload.data;
        state.currentIndex = action.payload.i;
        state.isActive = true;
    },
    nextSong: (state, action) => {
        if (state.currentIndex + 1 < state.currentSongs.length) {
          state.currentIndex += 1;
          state.activeSong = state.currentSongs[state.currentIndex];
          state.isActive = true;
        }
      },
      prevSong: (state, action) => {
        if (state.currentIndex - 1 >= 0) {
          state.currentIndex -= 1;
          state.activeSong = state.currentSongs[state.currentIndex];
          state.isActive = true;
        }
      },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { 
  setActiveSong, 
  nextSong, 
  prevSong, 
  playPause, 
  selectGenreListId 
} = playerSlice.actions;

export default playerSlice.reducer;