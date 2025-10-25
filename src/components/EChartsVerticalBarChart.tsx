// File: src/components/EChartsVerticalBarChart.tsx

import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

// Định nghĩa kiểu dữ liệu cho props
interface VerticalBarData {
  name: string;
  value: number;
}

interface EChartsVerticalBarChartProps {
  data: VerticalBarData[];
  colors: string[];
}

const EChartsVerticalBarChart: React.FC<EChartsVerticalBarChartProps> = ({ data, colors }) => {

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
      }
    },
    // Chú giải (Legend) ở dưới cùng
    legend: {
      data: data.map(item => item.name),
      textStyle: {
        color: '#ccc'
      },
      bottom: 10,
      type: 'scroll' // Cho phép cuộn nếu có quá nhiều mục
    },
    // Lưới tọa độ
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%', // Tăng khoảng trống cho legend
      containLabel: true
    },
    // Trục X (Tên các protocol/sàn)
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        color: '#999',
        interval: 0, // Hiển thị tất cả các nhãn
        rotate: 30   // Xoay nhẹ nhãn nếu chúng quá dài để tránh chồng chéo
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    // Trục Y (Số lượng transactions)
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#999'
      }
    },
    // Dữ liệu series
    series: [
      {
        name: 'Transactions', // Tên này sẽ không hiển thị nhưng cần cho cấu trúc
        type: 'bar',
        barWidth: '60%',
        // Gán dữ liệu và màu sắc cho từng cột
        data: data.map((item, index) => ({
          value: item.value,
          itemStyle: {
            color: colors[index % colors.length]
          }
        })),
        // Hiển thị số liệu trên đỉnh mỗi cột
        label: {
          show: true,
          position: 'top',
          color: '#ccc'
        },
        emphasis: {
          focus: 'series'
        },
        // Hiển thị nền mờ cho các cột
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '500px', width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
      theme={"dark"}
    />
  );
};

export default EChartsVerticalBarChart;