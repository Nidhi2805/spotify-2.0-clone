import React, { useState } from 'react';
import { useGetSongsBySearchQuery } from '../services/apiSlice';
import  SongList  from '../components/SongList';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import Error  from '../components/Error';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useGetSongsBySearchQuery(searchTerm, {
    skip: !searchTerm,
  });

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search</h1>
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Artists, songs, or podcasts"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to load search results" />
      ) : searchTerm ? (
        <div className="search-results">
          <h2>Results for "{searchTerm}"</h2>
          <SongList songs={data?.tracks?.hits || []} />
        </div>
      ) : (
        <div className="search-prompts">
          <h2>Browse all</h2>
          <div className="genre-grid">
            {['pop', 'rock', 'hiphop', 'jazz', 'electronic'].map(genre => (
              <div key={genre} className="genre-card">
                {genre}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;