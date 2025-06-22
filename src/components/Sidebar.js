import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/authSlice';
import { 
  FaHome, 
  FaSearch, 
  FaBook, 
  FaPlus, 
  FaHeart, 
  FaSpotify 
} from 'react-icons/fa';
import { BiLibrary } from 'react-icons/bi';

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/search', icon: <FaSearch />, label: 'Search' },
    { path: '/library', icon: <BiLibrary />, label: 'Your Library' }
  ];

  const playlistItems = [
    { id: 'create', icon: <FaPlus />, label: 'Create Playlist' },
    { id: 'liked', icon: <FaHeart />, label: 'Liked Songs' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <FaSpotify className="spotify-icon" />
        <span>Spotify</span>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-items">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-playlists">
        <ul className="playlist-items">
          {playlistItems.map((item) => (
            <li key={item.id}>
              <button className="playlist-link">
                <span className="playlist-icon">{item.icon}</span>
                <span className="playlist-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {user?.playlists && (
        <div className="user-playlists">
          <div className="divider"></div>
          <ul className="playlist-items">
            {user.playlists.map((playlist) => (
              <li key={playlist.id}>
                <NavLink 
                  to={`/playlist/${playlist.id}`}
                  className={({ isActive }) => 
                    `playlist-link ${isActive ? 'active' : ''}`
                  }
                >
                  {playlist.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;