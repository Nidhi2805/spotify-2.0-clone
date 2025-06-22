import { createSelector } from '@reduxjs/toolkit';

const selectPlayer = (state) => state.player;

export const selectCurrentSongs = createSelector(
  [selectPlayer],
  (player) => player.currentSongs
);

export const selectActiveSong = createSelector(
  [selectPlayer],
  (player) => player.activeSong
);

export const selectIsPlaying = createSelector(
  [selectPlayer],
  (player) => player.isPlaying
);