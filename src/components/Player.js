import styles from './Player.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectActiveSong, 
  selectIsPlaying,
  selectCurrentSongs,
  selectCurrentIndex
} from '../features/selectors';
import { playPause, nextSong, prevSong } from '../features/playerSlice';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaRandom, FaRedo } from 'react-icons/fa';
import { MdPlaylistAdd, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import WaveSurfer from 'wavesurfer.js';

const Player = () => {
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { activeSong, isPlaying, currentSongs, currentIndex } = useSelector((state) => ({
    activeSong: selectActiveSong(state),
    isPlaying: selectIsPlaying(state),
    currentSongs: selectCurrentSongs(state),
    currentIndex: selectCurrentIndex(state),
  }));

  useEffect(() => {
    if (waveformRef.current && activeSong?.audio) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#777',
        progressColor: '#1DB954',
        cursorColor: 'transparent',
        barWidth: 2,
        barRadius: 3,
        barGap: 2,
        responsive: true,
        height: 60,
        normalize: true,
        partialRender: true
      });

      wavesurfer.current.load(activeSong.audio);

      wavesurfer.current.on('ready', () => {
        wavesurfer.current.setVolume(volume);
        if (isPlaying) {
          wavesurfer.current.play();
        }
      });

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current.getCurrentTime());
        setDuration(wavesurfer.current.getDuration());
      });

      wavesurfer.current.on('finish', () => {
        if (isRepeat) {
          wavesurfer.current.play();
        } else {
          dispatch(nextSong());
        }
      });

      return () => {
        wavesurfer.current.destroy();
      };
    }
  }, [activeSong?.audio]);

  useEffect(() => {
    if (!wavesurfer.current) return;
    
    if (isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!activeSong?.title) return;
    dispatch(playPause(!isPlaying));
  };

  const handleNextSong = () => {
    if (currentSongs.length === 0) return;
    dispatch(nextSong());
  };

  const handlePrevSong = () => {
    if (currentSongs.length === 0) return;
    dispatch(prevSong());
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newVolume);
    }
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(seekTo / 100);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(updateFavoriteStatus(activeSong.id, !isFavorite));
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const toggleShuffle = () => {
  setIsShuffle((prev) => {
    const newShuffle = !prev;
    if (newShuffle) {
      const shuffled = shuffleArray([...currentSongs]);
      dispatch(updateShuffledSongs(shuffled));
    } else {
      dispatch(resetSongsOrder()); 
    }
    return newShuffle;
  });
};


  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const addToPlaylist = () => {
    dispatch(addSongToPlaylist(activeSong));
  };

  return (
    <div className={styles['player-container']}>
      <div className="player-info">
        {activeSong?.image && (
          <div className="song-thumbnail">
            <img src={activeSong.image} alt={activeSong.title} />
          </div>
        )}
        <div className="song-details">
          <h4 className="song-title">{activeSong?.title || 'No song selected'}</h4>
          <p className="song-artist">{activeSong?.artist || 'Unknown artist'}</p>
        </div>
        <button 
          className="favorite-button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <MdFavorite color="#1DB954" /> : <MdFavoriteBorder />}
        </button>
      </div>

      <div className="player-controls">
        <div className="waveform-container" ref={waveformRef} />
        
        <div className="progress-container">
          <span className="time current">{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span className="time duration">{formatTime(duration)}</span>
        </div>

        <div className="controls">
          <button 
            className={`control-button ${isShuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            aria-label="Shuffle"
          >
            <FaRandom />
          </button>
          
          <button 
            className="control-button" 
            onClick={handlePrevSong}
            aria-label="Previous song"
          >
            <FaStepBackward />
          </button>
          
          <button 
            className="play-pause" 
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          
          <button 
            className="control-button" 
            onClick={handleNextSong}
            aria-label="Next song"
          >
            <FaStepForward />
          </button>
          
          <button 
            className={`control-button ${isRepeat ? 'active' : ''}`}
            onClick={toggleRepeat}
            aria-label="Repeat"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      <div className="player-options">
        <button 
          className="option-button"
          onClick={addToPlaylist}
          aria-label="Add to playlist"
        >
          <MdPlaylistAdd />
        </button>
        
        <div className="volume-control">
          <FaVolumeUp />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;