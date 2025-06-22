import { setActiveSong, playPause } from './playerSlice';
import { useGetSongDetailsQuery } from '../services/apiSlice';

export const playSong = (song, data, i) => async (dispatch) => {
  try {
    dispatch(setActiveSong({ song, data, i }));

    const { data: songDetails } = await useGetSongDetailsQuery(song.key);

    dispatch(updateSongDetails(songDetails));

    dispatch(playPause(true));
  } catch (error) {
    console.error('Error playing song:', error);
  }
};