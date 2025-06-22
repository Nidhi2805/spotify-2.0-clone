import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaylistQuery } from '../services/apiSlice';
import { useSelector } from 'react-redux';
import  PlayerControls  from '../components/PlayerControls';
import  SongList  from '../components/SongList';
import  PlaylistHeader  from '../components/PlaylistHeader';
import Loader from '../components/Loader';
import Error from '../components/Error';
const Playlist = () => {
  const { id } = useParams();
  const { data: playlist, isLoading, error } = useGetPlaylistQuery(id);
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  if (isLoading) return <Loader />;
  if (error) return <Error message="Failed to load playlist" />;

  return (
    <div className="playlist-page">
      <PlaylistHeader 
        playlist={playlist}
        isPlaying={isPlaying}
      />

      <PlayerControls 
        songs={playlist.songs}
        playlistId={id}
      />

      <SongList 
        songs={playlist.songs} 
        activeSong={activeSong}
        isPlaying={isPlaying}
        playlistId={id}
      />
    </div>
  );
};

export default Playlist;