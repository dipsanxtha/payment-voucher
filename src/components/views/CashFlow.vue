<template>
  <div class="cashflow-card-content">
    <div class="cashflow-header">
      <h3>Cash Flow</h3>
      <div class="filter-dropdown">
        <button class="filter-btn" @click="toggleDropdown">
          <i class="far fa-calendar-alt"></i>
          <span>{{ selectedFilter }}</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div v-if="isDropdownOpen" class="dropdown-menu">
          <a v-for="filter in filters" 
             :key="filter" 
             href="#"
             @click.prevent="selectFilter(filter)"
          >
            {{ filter }}
          </a>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <div class="doughnut-chart-wrapper">
        <Doughnut :data="chartData" :options="chartOptions" />
        <div class="chart-center-text">
          <span>76%</span>
        </div>
      </div>

      <div class="cashflow-stats">
        <div class="stat-item">
          <span class="stat-label">INCOME</span>
          <span class="stat-value">76%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">EXPENSE</span>
          <span class="stat-value">23%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">OTHER</span>
          <span class="stat-value">1%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'CashFlow',
  components: { Doughnut },
  data() {
    return {
      isDropdownOpen: false,
      selectedFilter: 'Weekly',
      filters: ['Today', 'Weekly', 'Monthly', 'Yearly'],
      chartData: {
        datasets: [
          {
            data: [76, 23, 1],
            backgroundColor: ['#4F46E5', '#3B82F6', '#BFDBFE'],
            borderWidth: 0,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectFilter(filter) {
      this.selectedFilter = filter;
      this.isDropdownOpen = false;
    }
  }
};
</script>

<style scoped>
.cashflow-card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  border-radius: 12px;
}

.cashflow-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.filter-dropdown {
  position: relative;
}

.filter-btn {
  background: #f1f3f6;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 120px;
  z-index: 10;
}

.dropdown-menu a {
  display: block;
  padding: 0.7rem 1rem;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
}

.dropdown-menu a:hover {
  background-color: #f8f9fa;
}

.chart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.doughnut-chart-wrapper {
  position: relative;
  width: 100%;
  max-width: 200px;
  aspect-ratio: 1 / 1;
  margin: 0 auto 2rem;
}

.chart-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.cashflow-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

@media (max-width: 768px) {
  .cashflow-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .doughnut-chart-wrapper {
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .cashflow-card-content {
    padding: 1rem;
  }
  .doughnut-chart-wrapper {
    max-width: 150px;
    margin-bottom: 1.5rem;
  }
  .chart-center-text {
    font-size: 1.75rem;
  }
  .stat-label {
    font-size: 0.7rem;
  }
  .stat-value {
    font-size: 0.9rem;
  }
}
</style> 