// File: App.tsx

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css'; // <-- LỖI 1: BẠN ĐÃ THIẾU DÒNG NÀY

// Dữ liệu mẫu - bạn sẽ thay thế bằng dữ liệu on-chain của mình
const onChainData = [
  { date: '10/01/2025', balance: 0 },
  { date: '10/02/2025', balance: 0 },
  { date: '10/03/2025', balance: 38000 },
  { date: '10/04/2025', balance: 29000 },
  { date: '10/05/2025', balance: 9000 },
  { date: '10/06/2025', balance: 26000 },
  { date: '10/07/2025', balance: 11000 },
];

// LỖI 2: Đổi tên component thành `App` để khớp với tên file
function App() {
  return (
    // Thêm div bọc ngoài để áp dụng style từ App.css
    <div>
      <h1>Biểu đồ On-Chain Balance (Dùng Recharts Codepen)</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={onChainData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            {/* Tạo màu gradient cho giống với biểu đồ của bạn */}
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          {/* Sửa lại trục X và Y để hiển thị đẹp hơn trên nền tối */}
          <XAxis dataKey="date" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip
            contentStyle={{ backgroundColor: '#111', border: '1px solid #555' }}
            labelStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorBalance)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App; // Export component App