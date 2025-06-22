import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
  songDetails: null,
  favorites: [],
  playlist: [],
  shuffledSongs: [],
  originalSongs: [],
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
    updateSongDetails: (state, action) => {
      state.songDetails = action.payload; 
    },
    updateFavoriteStatus: (state, action) => {
      const song = action.payload;
      const index = state.favorites.findIndex((s) => s.key === song.key);
    
      if (index === -1) {
        state.favorites.push(song); 
      } else {
        state.favorites.splice(index, 1);
      }
    },
    updateShuffledSongs: (state) => {
      if (state.currentSongs.length > 0) {
        state.originalSongs = [...state.currentSongs]; 
        state.shuffledSongs = [...state.currentSongs].sort(() => Math.random() - 0.5);
        state.currentSongs = state.shuffledSongs;
        state.currentIndex = 0;
        state.activeSong = state.currentSongs[0];
        state.isActive = true;
      }
    },
    resetSongsOrder: (state) => {
      if (state.originalSongs.length > 0) {
        state.currentSongs = [...state.originalSongs];
        state.currentIndex = 0;
        state.activeSong = state.currentSongs[0];
        state.isActive = true;
      }
    },
    addSongToPlaylist: (state, action) => {
      const song = action.payload;
      const exists = state.playlist.find((s) => s.key === song.key);
      if (!exists) {
        state.playlist.push(song);
      }
    },
    
  },
});

export const { 
  setActiveSong, 
  nextSong, 
  prevSong, 
  playPause, 
  selectGenreListId,
  updateSongDetails,
  updateFavoriteStatus, 
  updateShuffledSongs, 
  resetSongsOrder,
  addSongToPlaylist 
} = playerSlice.actions;

export default playerSlice.reducer;