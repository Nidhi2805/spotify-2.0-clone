import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './features/authSlice';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import  Player from './components/Player';
import  Sidebar  from './components/Sidebar';
import  TopNav  from './components/TopNav';
import '../src/styles/theme';

function App() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <TopNav />
        
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={user ? <Library /> : <Login />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <Player />
    </div>
  );
}

export default App;