import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Watchlist from './Watchlist';
import Portfolio from './Portfolio';
import News from './News';
import '../styles/Layout.css';

function Layout() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'watchlist':
        return <Watchlist />;
      case 'portfolio':
        return <Portfolio />;
      case 'news':
        return <News />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <TopNavbar />
      <div className="main-area">
        <Sidebar setActivePage={setActivePage} />
        <div className="main-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Layout;
