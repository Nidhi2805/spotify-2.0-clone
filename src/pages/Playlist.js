import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaylistQuery } from '../services/apiSlice';
import { useSelector } from 'react-redux';
import { PlayerControls, SongList, PlaylistHeader } from '../components';

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