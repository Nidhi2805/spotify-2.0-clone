import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/authSlice';
import { PlaylistGrid, SongList } from '../components';

const Library = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="library-page">
      <h1>Your Library</h1>
      
      {user?.playlists?.length > 0 ? (
        <>
          <section className="playlists-section">
            <h2>Playlists</h2>
            <PlaylistGrid playlists={user.playlists} />
          </section>

          <section className="recently-played">
            <h2>Recently Played</h2>
            <SongList songs={user.recentlyPlayed || []} />
          </section>
        </>
      ) : (
        <div className="empty-library">
          <h2>Your library is empty</h2>
          <p>Start saving your favorite playlists and songs</p>
        </div>
      )}
    </div>
  );
};

export default Library;