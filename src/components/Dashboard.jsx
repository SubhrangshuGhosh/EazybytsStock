import React, { useEffect } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
  useEffect(() => {
    // Market Overview (top section)
    const marketScript = document.createElement('script');
    marketScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    marketScript.async = true;
    marketScript.innerHTML = JSON.stringify({
      colorTheme: 'light',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      width: '100%',
      height: '100%',
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      tabs: [
        {
          title: 'Indices',
          symbols: [
            { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
            { s: 'FOREXCOM:NSXUSD', d: 'Nasdaq 100' },
            { s: 'FOREXCOM:DJI', d: 'Dow 30' },
            { s: 'INDEX:NKY', d: 'Nikkei 225' },
            { s: 'INDEX:DEU40', d: 'DAX' },
            { s: 'FOREXCOM:UKXGBP', d: 'FTSE 100' }
          ]
        },
        {
          title: 'Crypto',
          symbols: [
            { s: 'BITSTAMP:BTCUSD', d: 'Bitcoin' },
            { s: 'BITSTAMP:ETHUSD', d: 'Ethereum' },
            { s: 'BINANCE:BNBUSDT', d: 'Binance Coin' },
            { s: 'BINANCE:XRPUSDT', d: 'XRP' }
          ]
        },
        {
          title: 'Forex',
          symbols: [
            { s: 'FX:EURUSD' },
            { s: 'FX:GBPUSD' },
            { s: 'FX:USDJPY' },
            { s: 'FX:USDCHF' }
          ]
        }
      ]
    });
    const marketWidget = document.getElementById('tradingview-widget');
    if (marketWidget) {
      marketWidget.innerHTML = '';
      marketWidget.appendChild(marketScript);
    }

    // Top Movers (box A)
    const moversScript = document.createElement('script');
    moversScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    moversScript.async = true;
    moversScript.innerHTML = JSON.stringify({
      colorTheme: 'light',
      dateRange: '1D',
      showChart: true,
      locale: 'en',
      width: '100%',
      height: '100%',
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      tabs: [
        {
          title: 'Top Gainers',
          symbols: [
            { s: 'NASDAQ:AAPL', d: 'Apple' },
            { s: 'NASDAQ:TSLA', d: 'Tesla' },
            { s: 'NYSE:NVDA', d: 'Nvidia' },
            { s: 'NASDAQ:AMD', d: 'AMD' },
            { s: 'NYSE:BA', d: 'Boeing' }
          ]
        },
        {
          title: 'Top Losers',
          symbols: [
            { s: 'NASDAQ:INTC', d: 'Intel' },
            { s: 'NYSE:DIS', d: 'Disney' },
            { s: 'NYSE:WMT', d: 'Walmart' },
            { s: 'NASDAQ:PYPL', d: 'PayPal' },
            { s: 'NASDAQ:GOOG', d: 'Google' }
          ]
        }
      ]
    });
    const topMoversWidget = document.getElementById('top-movers-widget');
    if (topMoversWidget) {
      topMoversWidget.innerHTML = '';
      topMoversWidget.appendChild(moversScript);
    }

    // ✅ Real-Time Stock News (Box B)
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

    const newsWidget = document.getElementById('stock-news-widget');
    if (newsWidget) {
      newsWidget.innerHTML = '';
      newsWidget.appendChild(newsScript);
    }

  }, []);

  return (
    <div className="dashboard-container">
      <h2>Real-Time Market Overview</h2>
      <div className="market-box">
        <div id="tradingview-widget" className="widget-box" />
      </div>

      <div className="dashboard-lower">
        <div className="box box-a">
          
          <div id="top-movers-widget" className="widget-box" />
        </div>
        <div className="box box-b">
          
          <div id="stock-news-widget" className="widget-box" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
