import React, { useEffect } from 'react';
import '../styles/News.css'; // optional for extra styles

function News() {
  useEffect(() => {
    const newsScript = document.createElement('script');
    newsScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    newsScript.async = true;
    newsScript.innerHTML = JSON.stringify({
      feedMode: 'market',
      market: 'stock',
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'regular',
      width: '100%',
      height: '100%',
      locale: 'en'
    });

    const container = document.getElementById('full-news-widget');
    if (container) {
      container.innerHTML = '';
      container.appendChild(newsScript);
    }
  }, []);

  return (
    <div className="news-page">
      <h2>Real-Time Stock News</h2>
      <div id="full-news-widget" className="news-widget-box" />
    </div>
  );
}

export default News;
