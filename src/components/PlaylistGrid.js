import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistGrid = ({ playlists = [] }) => {
  return (
    <div className="playlist-grid">
      {playlists.map((playlist) => (
        <Link 
          to={`/playlist/${playlist.id}`} 
          key={playlist.id}
          className="playlist-card"
        >
          <div className="playlist-image">
            <img 
              src={playlist.images[0]?.url || '/default-playlist.png'} 
              alt={playlist.name} 
            />
          </div>
          <h3 className="playlist-name">{playlist.name}</h3>
          <p className="playlist-description">{playlist.description || `${playlist.tracks.total} songs`}</p>
        </Link>
      ))}
    </div>
  );
};

export default PlaylistGrid;