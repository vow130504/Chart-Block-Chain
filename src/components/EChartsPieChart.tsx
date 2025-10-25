// File: src/EChartsPieChart.tsx

import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

// Định nghĩa kiểu dữ liệu cho props
interface EChartsPieChartProps {
  data: { name: string; value: number }[];
  colors: string[];
  totalValue: number;
}

const EChartsPieChart: React.FC<EChartsPieChartProps> = ({ data, colors, totalValue }) => {
  
  const option: EChartsOption = {
    // Tooltip khi hover
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: '#111',
      borderColor: '#555',
      textStyle: {
        color: '#fff'
      }
    },
    // Chú giải (Legend)
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: '#fff'
      },
      icon: 'circle'
    },
    // Cấu hình series cho biểu đồ
    series: [
      {
        name: 'Asset Allocation',
        type: 'pie',
        // Vị trí và kích thước
        radius: ['40%', '60%'], // Tương đương innerRadius và outerRadius
        center: ['50%', '50%'], // Đẩy tâm sang trái một chút để có chỗ cho legend
        
        // Dữ liệu
        data: data.map((item, index) => ({
          ...item,
          itemStyle: {
            color: colors[index % colors.length],
            borderColor: '#242424', // Màu nền làm viền
            borderWidth: 2,
          },
        })),
        
        // Tắt việc hiển thị label chồng lên nhau
        avoidLabelOverlap: true,
        
        // Cấu hình cho nhãn (label)
        label: {
          show: true,
          alignTo: 'edge',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 18,
          // Định dạng nội dung nhãn
          formatter: (params) => {
            const percent = params.percent != null ? params.percent.toFixed(2) : 0;
            return `{name|${params.name}}\n{value|${params.value?.toLocaleString()}} {percent|(${percent}%)}`;
          },
          rich: {
            name: {
              fontSize: 14,
              fontWeight: 600,
              color: '#fff'
            },
            value: {
              fontSize: 12,
              color: '#bbb',
            },
            percent: {
              fontSize: 11,
              color: '#888'
            }
          }
        },
        
        // Cấu hình đường kẻ nối (labelLine)
        labelLine: {
          length: 120,
          length2: 30,
          maxSurfaceAngle: 30,
          show: true
        },
        
        // **Đây là phần quan trọng nhất từ code mẫu của bạn**
        // Tự động điều chỉnh vị trí nhãn để không bị chồng chéo
        labelLayout(params: any) {
          const isLeft = params.labelRect.x < (params.chart.getWidth() / 2);
          const points = params.labelLinePoints;
          // Cập nhật điểm cuối của đường kẻ nối
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points
          };
        },
        
        // Text hiển thị ở giữa
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '700px', width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
      theme={"dark"}
    />
  );
};

export default EChartsPieChart;