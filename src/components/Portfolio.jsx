import React from 'react';
import '../styles/Portfolio.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { useState } from 'react';

const generateNaturalData = (years, startValue = 5000, startYear = 2010) => {
  const data = [];
  let value = startValue;

  for (let i = 0; i < years; i++) {
    const year = startYear + i;

    // Milder wave and noise for smoother curves
    const wave = Math.sin(i / 2) * 150; // reduced amplitude
    const trend = i * (80 + Math.random() * 40); // steady growth
    const noise = Math.random() * 100 - 50; // small jitter

    value = startValue + trend + wave + noise;

    data.push({
      date: year.toString(),
      value: parseFloat(value.toFixed(2)),
    });
  }

  return data;
};




const dummyPortfolio = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 10,
    purchasePrice: 145.0,
    currentPrice: 175.3,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    quantity: 5,
    purchasePrice: 260.0,
    currentPrice: 315.2,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 8,
    purchasePrice: 105.5,
    currentPrice: 130.1,
  },
];

const chartData = {
  '1Y': generateNaturalData(12, 12000, 2024),  // last 12 months
  '2Y': generateNaturalData(24, 10000, 2023),
  '5Y': generateNaturalData(60, 8000, 2020),
  'All': generateNaturalData(100, 5000, 2010),
};




function Portfolio() {
    const [range, setRange] = useState('1Y');

  const calculateTotalValue = () =>
    dummyPortfolio
      .reduce((acc, stock) => acc + stock.quantity * stock.currentPrice, 0)
      .toFixed(2);

  const calculateTotalPL = () =>
    dummyPortfolio
      .reduce(
        (acc, stock) =>
          acc + (stock.currentPrice - stock.purchasePrice) * stock.quantity,
        0
      )
      .toFixed(2);

  const totalValue = calculateTotalValue();
  const totalPL = calculateTotalPL();
  const cashBalance = 5000; // dummy static value
  const totalHoldings = dummyPortfolio.length;

  return (
    <div className="portfolio-container">
      <h2>My Portfolio</h2>

      {/* Summary Boxes */}
      <div className="portfolio-summary">
        <div className="summary-box">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#124cdd" fill="none">
    <path d="M16 14C16 14.8284 16.6716 15.5 17.5 15.5C18.3284 15.5 19 14.8284 19 14C19 13.1716 18.3284 12.5 17.5 12.5C16.6716 12.5 16 13.1716 16 14Z" stroke="#124cdd" stroke-width="1.5"></path>
    <path d="M4 20C2.89543 20 2 19.1046 2 18C2 16.8954 2.89543 16 4 16C5.10457 16 6 17.3333 6 18C6 18.6667 5.10457 20 4 20Z" stroke="#124cdd" stroke-width="1.5"></path>
    <path d="M8 20C6.89543 20 6 18.5 6 18C6 17.5 6.89543 16 8 16C9.10457 16 10 16.8954 10 18C10 19.1046 9.10457 20 8 20Z" stroke="#124cdd" stroke-width="1.5"></path>
    <path d="M13 20H16C18.8284 20 20.2426 20 21.1213 19.1213C22 18.2426 22 16.8284 22 14V13C22 10.1716 22 8.75736 21.1213 7.87868C20.48 7.23738 19.5534 7.06413 18 7.01732M10 7H16C16.7641 7 17.425 7 18 7.01732M18 7.01732C18 6.06917 18 5.5951 17.8425 5.22208C17.6399 4.7421 17.2579 4.36014 16.7779 4.15749C16.4049 4 15.9308 4 14.9827 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 7.22876 2 11V13" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round"></path>
</svg>
          <p className="label">Total Value</p>
          <p className="value">${totalValue}</p>
        </div>
        <div className="summary-box">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#124cdd" fill="none">
    <path d="M4 3H20" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M5.5 3V5.03039C5.5 6.27227 6.07682 7.4437 7.06116 8.20089L12 12L16.9388 8.20089C17.9232 7.44371 18.5 6.27227 18.5 5.03039V3" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M5.5 21V18.9696C5.5 17.7277 6.07682 16.5563 7.06116 15.7991L12 12L16.9388 15.7991C17.9232 16.5563 18.5 17.7277 18.5 18.9696V21" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M4 21H20" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
          <p className="label">Cash Balance</p>
          <p className="value">${cashBalance}</p>
        </div>
        <div className="summary-box">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#124cdd" fill="none">
    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M15 14V12C15 10.5858 15 9.87868 14.5607 9.43934C14.1213 9 13.4142 9 12 9H10M14 10L9 15" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
          <p className="label">Total P/L</p>
          <p className={`value ${totalPL >= 0 ? 'profit' : 'loss'}`}>
            ${totalPL}
          </p>
        </div>
        <div className="summary-box">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#124cdd" fill="none">
    <path d="M12 22C6.47715 22 2.00004 17.5228 2.00004 12C2.00004 6.47715 6.47719 2 12 2C16.4777 2 20.2257 4.94289 21.5 9H19" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M12 8V12L14 14" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M21.9551 13C21.9848 12.6709 22 12.3373 22 12M15 22C15.3416 21.8876 15.6753 21.7564 16 21.6078M20.7906 17C20.9835 16.6284 21.1555 16.2433 21.305 15.8462M18.1925 20.2292C18.5369 19.9441 18.8631 19.6358 19.1688 19.3065" stroke="#124cdd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
          <p className="label">Holdings</p>
          <p className="value">{totalHoldings}</p>
        </div>
      </div>

      {/* Table */}
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Profit/Loss</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {dummyPortfolio.map((stock, index) => (
            <tr key={index}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>${stock.purchasePrice}</td>
              <td>${stock.currentPrice}</td>
              <td
                className={
                  stock.currentPrice > stock.purchasePrice
                    ? 'profit'
                    : 'loss'
                }
              >
                ${(
                  (stock.currentPrice - stock.purchasePrice) *
                  stock.quantity
                ).toFixed(2)}
              </td>
              <td>
                <button className="remove-btn">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Chart Controls */}
<div className="chart-controls">
  {['1Y', '2Y', '5Y', 'All'].map((label) => (
    <button
      key={label}
      className={range === label ? 'active' : ''}
      onClick={() => setRange(label)}
    >
      {label}
    </button>
  ))}
</div>

{/* Chart */}
<div className="chart-container">
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={chartData[range]}>
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#4caf50" stopOpacity={0.6} />
          <stop offset="90%" stopColor="#4caf50" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip
  isAnimationActive={false}
  cursor={{ stroke: '#4caf50', strokeWidth: 1 }}
/>

      <Area
  type="natural"
  dataKey="value"
  stroke="#4caf50"
  strokeWidth={2}
  dot={false}
  activeDot={{ r: 4 }}
  fillOpacity={1}
  fill="url(#colorValue)"
/>

    </AreaChart>
  </ResponsiveContainer>
</div>

    </div>
  );
}

export default Portfolio;
