import React, { useState, useEffect } from 'react';
import { useGetTopChartsQuery, useGetSongsByGenreQuery } from '../services/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectGenreListId, setActiveSong, playPause } from '../features/playerSlice';
import { FaPlay, FaPause } from 'react-icons/fa';
import  Loader  from '../components/Loader';
import  Error  from '../components/Error';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { genreListId, isPlaying, activeSong } = useSelector((state) => state.player);
  const [isHovered, setIsHovered] = useState(null);
  
  const { data: topCharts, isLoading: isLoadingTopCharts, error: topChartsError } = useGetTopChartsQuery();
  const { data: genreSongs, isLoading: isLoadingGenre, error: genreError } = useGetSongsByGenreQuery(genreListId, {
    skip: !genreListId,
  });

  const genres = [
    { id: 'pop', name: 'Pop', color: '#8D67AB' },
    { id: 'rock', name: 'Rock', color: '#E61E32' },
    { id: 'hip-hop', name: 'Hip-Hop', color: '#BA5D07' },
    { id: 'electronic', name: 'Electronic', color: '#D84000' },
    { id: 'jazz', name: 'Jazz', color: '#1E3264' },
    { id: 'classical', name: 'Classical', color: '#E8115B' },
    { id: 'country', name: 'Country', color: '#0D73EC' },
    { id: 'rnb', name: 'R&B', color: '#148A08' },
  ];

  const songs = genreListId ? genreSongs?.tracks : topCharts?.tracks;

  const handleGenreChange = (genreId) => {
    dispatch(selectGenreListId(genreId === genreListId ? '' : genreId));
  };

  const handlePlayClick = (song, i) => {
    if (activeSong?.key === song.key) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(setActiveSong({ song, data: songs, i }));
      dispatch(playPause(true));
    }
  };

  useEffect(() => {
    if (!genreListId && topCharts) {
      dispatch(selectGenreListId('pop'));
    }
  }, [topCharts, genreListId, dispatch]);

  if ((isLoadingTopCharts && !genreListId) || (isLoadingGenre && genreListId)) {
    return <Loader title="Loading songs..." />;
  }

  if (topChartsError || genreError) {
    return <Error />;
  }

  return (
    <div className={styles["home-container"]}>
      <div className="home-header">
        <h1>{genreListId ? `${genres.find(g => g.id === genreListId)?.name} Songs` : 'Discover Music'}</h1>
        
        <div className="genre-selector">
          {genres.map((genre) => (
            <button 
              key={genre.id}
              className={`genre-pill ${genreListId === genre.id ? 'active' : ''}`}
              onClick={() => handleGenreChange(genre.id)}
              style={{
                backgroundColor: genreListId === genre.id ? genre.color : '#2a2a2a',
                borderColor: genre.color
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="songs-grid">
        {songs?.map((song, i) => (
          <div 
            key={`${song.key}-${i}`}
            className="song-card"
            onMouseEnter={() => setIsHovered(song.key)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div className="song-image-container">
              <img 
                src={song.images?.coverart || '/images/default-song.png'} 
                alt={song.title} 
                className="song-image"
              />
              
              {(isHovered === song.key || activeSong?.key === song.key) && (
                <button 
                  className="play-button"
                  onClick={() => handlePlayClick(song, i)}
                  style={{
                    opacity: isHovered === song.key || activeSong?.key === song.key ? 1 : 0
                  }}
                >
                  {activeSong?.key === song.key && isPlaying ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </button>
              )}
            </div>

            <div className="song-info">
              <h4 className="song-title">
                {song.title}
              </h4>
              <p className="song-subtitle">
                {song.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;