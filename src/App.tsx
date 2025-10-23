// File: App.tsx

import React, { useCallback, useState } from 'react'; // <-- (THAY ĐỔI) Import hooks
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Legend, Cell, Label, Sector // <-- (THAY ĐỔI) Import Sector
} from 'recharts';
import './App.css';

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
  { name: 'BNB', value: 9440 }, { name: 'ETH', value: 1610 },
  { name: 'AVAX', value: 17.5 }, { name: 'USDC', value: 5.56 },
  { name: 'SIREN', value: 3.22 }, { name: 'Other', value: 6.12 },
];
const COLORS = ['#8a2be2', '#fa8072', '#f39c12', '#3498db', '#2980b9', '#2ecc71'];
const TOTAL_VALUE = 11082.4;


// =================================================================
// (MỚI) HÀM VẼ SHAPE KHI ACTIVE (HOVER)
// Dựa trên sandbox bạn cung cấp và đã tùy chỉnh lại
// =================================================================
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* Phần text tên token ở giữa khi hover */}
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={16} fontWeight="bold">
        {payload.name}
      </text>
      {/* Sector chính của miếng bánh */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Sector viền ngoài để làm nổi bật */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* Đường kẻ và text chi tiết bên ngoài */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">
        {`Value ${value.toFixed(2)}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


// Component App
function App() {
  // (MỚI) State để lưu index của slice đang được hover
  const [activeIndex, setActiveIndex] = useState(0);

  // (MỚI) Callback để cập nhật state khi người dùng hover vào một slice
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const TypedPie = Pie as any;

  return (
    <div>
      {/* PHẦN 1: BIỂU ĐỒ LINE CHART (KHÔNG ĐỔI) */}
      <h1>Biểu đồ On-Chain Balance (Area Chart)</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={onChainData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
          <XAxis dataKey="date" stroke="#999"/>
          <YAxis stroke="#999"/>
          <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #555' }} labelStyle={{ color: '#fff' }}/>
          <Area type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorBalance)"/>
        </AreaChart>
      </ResponsiveContainer>

      <hr style={{ margin: '40px 0', borderColor: '#555' }}/>

      {/* PHẦN 2: BIỂU ĐỒ TRÒN (ĐÃ TÍCH HỢP HIỆU ỨNG MỚI) */}
      <h2>Phân bổ tài sản (Doughnut Chart)</h2>
      <ResponsiveContainer width="100%" height={460}>
  <PieChart>
    <defs>
      {COLORS.map((color, index) => (
        <radialGradient id={`grad-${index}`} key={index}>
          <stop offset="0%" stopColor="#fff" stopOpacity={0.3}/>
          <stop offset="100%" stopColor={color}/>
        </radialGradient>
      ))}
    </defs>

    <Tooltip
      contentStyle={{ backgroundColor: '#111', border: '1px solid #555', borderRadius: '10px' }}
      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
    />
    <Legend
      layout="vertical"
      align="right"
      verticalAlign="middle"
      iconType="circle"
      wrapperStyle={{ color: '#fff', fontSize: 14 }}
    />

    <TypedPie
      activeIndex={activeIndex}
      activeShape={renderActiveShape}
      onMouseEnter={onPieEnter}
      data={pieChartData}
      cx="50%"
      cy="50%"
      innerRadius={100}
      outerRadius={150}
      paddingAngle={2}
      dataKey="value"
    >
      <Label
        value={`$${TOTAL_VALUE.toLocaleString()}`}
        position="center"
        fill="#fff"
        fontSize={28}
        fontWeight="700"
      />
      {pieChartData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={`url(#grad-${index})`}
          stroke="#1a1a1a"
          strokeWidth={2}
          style={{
            filter: activeIndex === index ? 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' : 'none',
            transform: activeIndex === index ? 'scale(1.03)' : 'scale(1)',
            transformOrigin: 'center',
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </TypedPie>
  </PieChart>
</ResponsiveContainer>

    </div>
  );
}

export default App;