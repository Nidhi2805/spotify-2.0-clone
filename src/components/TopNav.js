import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/authSlice';
import { FaSearch, FaChevronDown, FaBell, FaUser } from 'react-icons/fa';
import { MdOutlineArrowBack, MdOutlineArrowForward } from 'react-icons/md';

const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-controls">
        <button className="nav-button back">
          <MdOutlineArrowBack />
        </button>
        <button className="nav-button forward">
          <MdOutlineArrowForward />
        </button>
        
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for artists, songs, or playlists"
            className="search-input"
          />
        </div>
      </div>

      <div className="user-menu">
        <button className="upgrade-button">
          Upgrade
        </button>
        
        <button className="notification-button">
          <FaBell />
        </button>
        
        <div className="user-profile">
          <div className="profile-image">
            {user?.images?.[0]?.url ? (
              <img src={user.images[0].url} alt={user.display_name} />
            ) : (
              <FaUser className="default-avatar" />
            )}
          </div>
          <span className="profile-name">{user?.display_name || 'User'}</span>
          <FaChevronDown className="dropdown-icon" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;