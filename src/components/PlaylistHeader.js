import React from 'react';
import { useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PlaylistHeader = ({ playlist, isPlaying }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const { activeSong } = useSelector((state) => state.player);
  const isActivePlaylist = activeSong?.playlistId === playlist.id;

  return (
    <div className="playlist-header">
      <div className="playlist-image-container">
        <img 
          src={playlist.images[0]?.url || '/default-playlist.png'} 
          alt={playlist.name}
          className={`playlist-image ${isActivePlaylist && isPlaying ? 'playing' : ''}`}
        />
      </div>
      
      <div className="playlist-info">
        <p className="playlist-type">PLAYLIST</p>
        <h1 className="playlist-name">{playlist.name}</h1>
        
        <div className="playlist-meta">
          <p className="playlist-description">{playlist.description}</p>
          <p className="playlist-stats">
            {playlist.owner?.display_name} • {playlist.tracks?.total} songs
          </p>
        </div>
        
        <div className="playlist-actions">
          <button 
            className={`play-button ${isActivePlaylist && isPlaying ? 'playing' : ''}`}
            onClick={() => {}}
          >
            {isActivePlaylist && isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          
          <button 
            className="like-button" 
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <FaHeart color="#1DB954" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;