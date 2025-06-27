<template>
  <div class="chart-wrapper">
    <Bar :data="chartDataConfig" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'IncomeCharts',
  components: { Bar },
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartDataConfig() {
      const labels = this.chartData.map(d => d.month);
      const incomeData = this.chartData.map(d => [0, d.income]);
      const expenseData = this.chartData.map(d => [0, -d.expense]);

      return {
        labels: labels,
        datasets: [
          {
            label: 'Income',
            backgroundColor: '#10B981',
            data: incomeData,
            barPercentage: 0.5,
            categoryPercentage: 0.5
          },
          {
            label: 'Expense',
            backgroundColor: '#E5E7EB',
            data: expenseData,
            barPercentage: 0.5,
            categoryPercentage: 0.5
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw[1];
                const label = context.dataset.label;
                return `${label}: ₨ ${Math.abs(value).toLocaleString('ne-NP')}`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            ticks: {
              callback: (value) => {
                if (value === 0) return '₨ 0';
                return `₨ ${Math.abs(value / 1000)}k`;
              }
            },
            grid: {
              borderDash: [5, 5]
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
}
</style> 