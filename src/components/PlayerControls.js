import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../features/playerSlice';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo } from 'react-icons/fa';

const PlayerControls = ({ songs = [], playlistId }) => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong, currentIndex } = useSelector((state) => state.player);
  const isActivePlaylist = activeSong?.playlistId === playlistId;

  const handlePlayPause = () => {
    if (!songs.length) return;
    
    if (!isActivePlaylist) {
      // Start playing first song if different playlist
      dispatch(setActiveSong({ song: songs[0], data: songs, i: 0, playlistId }));
    }
    dispatch(playPause(!isPlaying));
  };

  const handleNextSong = () => {
    if (!songs.length) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    dispatch(setActiveSong({ song: songs[nextIndex], data: songs, i: nextIndex, playlistId }));
  };

  const handlePrevSong = () => {
    if (!songs.length) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    dispatch(setActiveSong({ song: songs[prevIndex], data: songs, i: prevIndex, playlistId }));
  };

  return (
    <div className="playlist-controls">
      <div className="control-buttons">
        <button className="control-button shuffle">
          <FaRandom />
        </button>
        
        <button className="control-button prev" onClick={handlePrevSong}>
          <FaStepBackward />
        </button>
        
        <button 
          className="play-pause-button" 
          onClick={handlePlayPause}
          disabled={!songs.length}
        >
          {isPlaying && isActivePlaylist ? <FaPause /> : <FaPlay />}
        </button>
        
        <button className="control-button next" onClick={handleNextSong}>
          <FaStepForward />
        </button>
        
        <button className="control-button repeat">
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;