import React, { useState, useEffect } from 'react';
import '../styles/Watchlist.css';

function Watchlist() {
  const [symbol, setSymbol] = useState('');
  const [watchlist, setWatchlist] = useState(['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA']);

  useEffect(() => {
    watchlist.forEach((sym) => {
      const containerId = `tv-widget-${sym}`;
      const container = document.getElementById(containerId);
      if (container && !container.hasChildNodes()) {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          symbol: `NASDAQ:${sym}`,
          width: '100%',
          height: 100,
          locale: 'en',
          dateRange: '1D',
          colorTheme: 'light',
          trendLineColor: '#2196F3',
          underLineColor: 'rgba(33, 150, 243, 0.12)',
          isTransparent: false,
          autosize: true
        });
        container.appendChild(script);
      }
    });
  }, [watchlist]);

  const handleAdd = () => {
    const cleaned = symbol.trim().toUpperCase();
    if (cleaned && !watchlist.includes(cleaned)) {
      setWatchlist([...watchlist, cleaned]);
    }
    setSymbol('');
  };

  return (
    <div className="watchlist-container">
      <div className="watchlist-searchbar">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="watchlist-items">
        {watchlist.map((sym) => (
          <div key={sym} className="stock-card">
            <div id={`tv-widget-${sym}`} className="tv-widget" />
            <button className="remove-btn" onClick={() => { /* does nothing */ }}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
