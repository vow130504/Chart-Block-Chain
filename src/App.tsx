// File: App.tsx

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './App.css';
// Import component ECharts mới
import EChartsPieChart from './components/EChartsPieChart';

// =================================================================
// DỮ LIỆU (KHÔNG ĐỔI)
// =================================================================
const onChainData = [
  { date: '10/01/2025', balance: 0 }, { date: '10/02/2025', balance: 0 },
  { date: '10/03/2025', balance: 38000 }, { date: '10/04/2025', balance: 29000 },
  { date: '10/05/2025', balance: 9000 }, { date: '10/06/2025', balance: 26000 },
  { date: '10/07/2025', balance: 11000 },
];
const pieChartData = [
  { name: 'BNB', value: 9440 },
  { name: 'ETH', value: 1610 },
  { name: 'AVAX', value: 17.5 },
  { name: 'USDC', value: 5.56 },
  { name: 'SIREN', value: 3.22 },
  { name: 'Other', value: 6.12 },
];
const COLORS = ['#3B82F6', '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#6B7280'];
const TOTAL_VALUE = 11082.4;


// Component App
function App() {
  return (
    <div>
      {/* PHẦN 1: BIỂU ĐỒ LINE CHART (KHÔNG THAY ĐỔI) */}
      <h1>Biểu đồ On-Chain Balance (Area Chart)</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={onChainData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
          <XAxis dataKey="date" stroke="#999"/>
          <YAxis stroke="#999"/>
          <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #555' }} labelStyle={{ color: '#fff' }}/>
          <Area type="monotone" dataKey="balance" stroke={COLORS[0]} fillOpacity={1} fill="url(#colorBalance)" />
        </AreaChart>
      </ResponsiveContainer>

      <hr style={{ margin: '40px 0', borderColor: '#555' }}/>

      {/* PHẦN 2: BIỂU ĐỒ TRÒN MỚI SỬ DỤNG ECHARTS */}
      <h2>Phân bổ tài sản (Doughnut Chart)</h2>
      <EChartsPieChart 
        data={pieChartData} 
        colors={COLORS} 
        totalValue={TOTAL_VALUE} 
      />
    </div>
  );
}

export default App;