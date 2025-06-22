import React, { useState, useEffect, useRef } from 'react';
import { useGetSongsBySearchQuery } from '../services/apiSlice';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong, playPause } from '../features/playerSlice';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  
  const { data: searchResults, error, isLoading, isFetching } = useGetSongsBySearchQuery(searchTerm, {
    skip: !searchTerm,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsFocused(false);
  };

  const handleSongSelect = (song, i) => {
    dispatch(setActiveSong({ song, data: searchResults?.tracks?.hits, i }));
    dispatch(playPause(true));
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setIsFocused(true);
    }
  };

  return (
    <div className={styles["search-container"]} ref={searchRef}>
      <div className={`search-input-container ${isFocused ? 'focused' : ''}`}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for songs, artists, or albums"
          aria-label="Search for music"
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {isFocused && searchTerm && (
        <div className="search-results">
          {isLoading || isFetching ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Searching...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Failed to load search results</p>
            </div>
          ) : searchResults?.tracks?.hits?.length > 0 ? (
            <>
              <div className="results-header">
                <h4>Search Results</h4>
                <span>{searchResults.tracks.hits.length} results</span>
              </div>
              <ul className="results-list">
                {searchResults.tracks.hits.map(({ track }, i) => (
                  <li 
                    key={`${track.key}-${i}`} 
                    className="result-item"
                    onClick={() => handleSongSelect(track, i)}
                  >
                    <div className="song-image">
                      <img src={track.images?.coverart} alt={track.title} />
                    </div>
                    <div className="song-info">
                      <h5 className="song-title">{track.title}</h5>
                      <p className="song-artist">{track.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="empty-state">
              <p>No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;