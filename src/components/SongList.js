import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong, playPause } from '../features/playerSlice';
import { FaPlay, FaPause } from 'react-icons/fa';
import { formatDuration } from '../utils';

const SongList = ({ songs = [], activeSong, isPlaying, playlistId }) => {
  const dispatch = useDispatch();

  const handlePlayClick = (song, i) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data: songs, i, playlistId }));
      dispatch(playPause(true));
    }
  };

  return (
    <div className="song-list">
      <div className="song-list-header">
        <div className="header-index">#</div>
        <div className="header-title">TITLE</div>
        <div className="header-duration">DURATION</div>
      </div>

      {songs.map((song, i) => (
        <div 
          key={`${song.key}-${i}`} 
          className={`song-item ${activeSong?.key === song.key ? 'active' : ''}`}
          onClick={() => handlePlayClick(song, i)}
        >
          <div className="song-index">
            {activeSong?.key === song.key && isPlaying ? (
              <FaPause className="play-icon" />
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          <div className="song-info">
            <img 
              src={song.images?.coverart || '/default-song.png'} 
              alt={song.title} 
              className="song-thumbnail"
            />
            <div className="song-details">
              <h4 className="song-title">{song.title}</h4>
              <p className="song-artist">{song.subtitle}</p>
            </div>
          </div>
          <div className="song-duration">
            {formatDuration(song.duration || '0:00')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;