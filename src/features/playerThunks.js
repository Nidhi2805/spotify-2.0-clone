import { setActiveSong, playPause, updateSongDetails } from './playerSlice';
import { apiSlice } from '../services/apiSlice';

export const playSong = (song, data, i) => async (dispatch) => {
  try {
    dispatch(setActiveSong({ song, data, i }));

    const result = await dispatch(
      apiSlice.endpoints.getSongDetails.initiate(song.key)
    );

    if (result?.data) {
      dispatch(updateSongDetails(result.data));
    }

    dispatch(playPause(true));
    dispatch(updateFavoriteStatus(song));
    dispatch(updateShuffledSongs());
    dispatch(resetSongsOrder());
    dispatch(addSongToPlaylist(song));
  } catch (error) {
    console.error('Error playing song:', error);
  }
};
