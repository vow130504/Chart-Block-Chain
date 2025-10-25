// File: src/components/EChartsBarChart.tsx (Đã sửa lỗi)

import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

// Định nghĩa kiểu dữ liệu cho props
interface ExchangeFlowData {
  exchanges: string[];
  deposits: number[];
  withdrawals: number[];
}

interface EChartsBarChartProps {
  data: ExchangeFlowData;
}

const EChartsBarChart: React.FC<EChartsBarChartProps> = ({ data }) => {

  const option: EChartsOption = {
    // Tooltip khi hover
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: '#111',
      borderColor: '#555',
      textStyle: {
        color: '#fff'
      },
      formatter: (params: any) => {
        let tooltipContent = `${params[0].name}<br/>`;
        let total = 0;
        params.forEach((item: any) => {
          tooltipContent += `${item.marker} ${item.seriesName}: ${item.value.toLocaleString()} USD<br/>`;
          total += item.value;
        });
        tooltipContent += `<strong>Total Volume: ${total.toLocaleString()} USD</strong>`;
        return tooltipContent;
      }
    },
    // Chú giải (Legend)
    legend: {
      data: ['Deposits', 'Withdrawals'],
      textStyle: {
        color: '#ccc'
      },
      bottom: 10,
    },
    // Lưới tọa độ
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    // Trục X (giá trị)
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: '#999'
      }
    },
    // Trục Y (tên sàn)
    yAxis: {
      type: 'category',
      data: data.exchanges,
      axisLabel: {
        color: '#eee',
        fontWeight: 'bold'
      }
    },
    // Dữ liệu series
    series: [
      {
        name: 'Deposits',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: data.deposits,
        itemStyle: {
          color: '#3B82F6'
        },
        // ======================= SỬA LỖI Ở ĐÂY =======================
        label: {
          show: true,
          position: 'inside',
          formatter: (params: any) => { // Chấp nhận params kiểu any
            const value = params.value;
            // Thêm bước kiểm tra kiểu dữ liệu an toàn
            if (typeof value === 'number' && value > 0) {
              return (value / 1000).toFixed(0) + 'K';
            }
            return ''; // Trả về chuỗi rỗng nếu không phải số hợp lệ
          }
        },
      },
      {
        name: 'Withdrawals',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: data.withdrawals,
        itemStyle: {
          color: '#EF4444'
        },
        // ======================= VÀ SỬA LỖI Ở ĐÂY =======================
        label: {
          show: true,
          position: 'inside',
          formatter: (params: any) => { // Chấp nhận params kiểu any
            const value = params.value;
            // Thêm bước kiểm tra kiểu dữ liệu an toàn
            if (typeof value === 'number' && value > 0) {
              return (value / 1000).toFixed(0) + 'K';
            }
            return ''; // Trả về chuỗi rỗng nếu không phải số hợp lệ
          }
        },
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
      theme={"dark"}
    />
  );
};

export default EChartsBarChart;