<template>
  <div class="dashboard-body">
    <main class="dashboard-main">
      <h1 class="main-title">Dashboard</h1>

      <div class="dashboard-grid">
        <div class="grid-card stat-card">
          <p class="stat-title">TOTAL REVENUE</p>
          <p class="stat-value">₨ 1,065,120.00</p>
        </div>
        <div class="grid-card stat-card">
          <p class="stat-title">SESSIONS</p>
          <p class="stat-value">181</p>
        </div>

        <div class="grid-card report-card">
          <div class="report-header">
            <h1 class="report-title">Report</h1>
            <div class="filter-dropdown">
              <button class="filter-btn" @click="toggleDropdown">
                <i class="far fa-calendar-alt"></i>
                <span>{{ selectedFilter.text }}</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div v-if="isDropdownOpen" class="dropdown-menu">
                <a
                  v-for="filter in filters"
                  :key="filter.value"
                  href="#"
                  @click.prevent="selectFilter(filter)"
                >
                  {{ filter.text }}
                </a>
              </div>
            </div>
          </div>
          <div class="chart-area">
            <IncomeCharts :chart-data="chartData" />
          </div>
        </div>

        <div class="grid-card cashflow-card">
          <CashFlow />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import IncomeCharts from './charts/IncomeCharts.vue';
import CashFlow from './views/CashFlow.vue';

export default {
  name: 'DashBoard',
  components: {
    IncomeCharts,
    CashFlow
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedFilter: { text: 'This Month', value: 'this_month' },
      filters: [
        { text: 'Today', value: 'today' },
        { text: 'Last Week', value: 'last_week' },
        { text: 'Last Month', value: 'last_month' },
        { text: 'This Year', value: 'this_year' }
      ],
      monthlyData: [
        { month: 'Jan', income: 95000, expense: 0 },
        { month: 'Feb', income: 82000, expense: 15000 },
        { month: 'Mar', income: 78000, expense: 25000 },
        { month: 'Apr', income: 90000, expense: 12000 },
        { month: 'May', income: 85000, expense: 18000 },
        { month: 'Jun', income: 92000, expense: 0 },
        { month: 'Jul', income: 88000, expense: 22000 },
        { month: 'Aug', income: 86000, expense: 16000 },
        { month: 'Sep', income: 95000, expense: 28000 },
        { month: 'Oct', income: 89000, expense: 14000 },
        { month: 'Nov', income: 92000, expense: 0 },
        { month: 'Dec', income: 91000, expense: 20000 }
      ]
    };
  },
  computed: {
    chartData() {
      return this.monthlyData;
    }
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.dashboard-body {
  background-color: #f8f9fa;
  font-family: 'Poppins', sans-serif;
}

.dashboard-main {
  padding: 2rem;
}

.main-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.grid-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.upgrade-card {
  background-image: linear-gradient(to right, #4f46e5, #818cf8);
  color: white;
  display: flex;
  align-items: center;
  padding: 2rem;
}

.upgrade-content h2 {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.upgrade-content button {
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.balance-card {
  padding: 1.5rem;
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.balance-header h3 {
  margin: 0;
  font-weight: 600;
}

.card-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.card-selector img {
  width: 24px;
}

.balance-amount {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.balance-boost {
  color: #10b981;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.balance-actions {
  display: flex;
  gap: 1rem;
}

.balance-actions button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  font-weight: 600;
}

.btn-transfer {
  background-color: #eff6ff;
  color: #3b82f6;
}

.btn-request {
  background-color: #ffe4e6;
  color: #ef4444;
}

.stat-card {
  padding: 1.5rem;
}

.stat-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.report-card {
  padding: 1.5rem;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.report-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.filter-dropdown {
  position: relative;
}

.filter-btn {
  background: #f1f3f6;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 160px;
  z-index: 10;
  margin-top: 0.5rem;
  overflow: hidden;
}

.dropdown-menu a {
  display: block;
  padding: 0.7rem 1rem;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
}

.dropdown-menu a:hover {
  background: #f7f7f7;
}

.chart-area {
  position: relative;
  width: 100%;
  min-height: 300px;
  aspect-ratio: 16 / 9; /* Common aspect ratio for charts */
}

.report-card.scrollable-card,
.cashflow-card.scrollable-card {
  max-height: 420px;
  overflow: auto;
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .stat-card,
  .report-card {
    padding: 1rem;
  }
  .chart-area {
    min-height: 250px;
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 992px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .dashboard-main {
    padding: 1.5rem;
  }
  .main-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1rem;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .report-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .stat-value {
    font-size: 1.25rem;
  }
}

@media (max-width: 600px) {
  .dashboard-main {
    padding: 0.5rem;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .main-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .stat-card,
  .report-card {
    padding: 0.7rem;
    border-radius: 8px;
  }
  .stat-title {
    font-size: 0.7rem;
  }
  .stat-value {
    font-size: 1rem;
  }
  .report-title {
    font-size: 1rem;
  }
  .filter-btn {
    padding: 0.5rem 0.7rem;
    font-size: 0.85rem;
    border-radius: 6px;
  }
  .dropdown-menu {
    width: 100%;
    min-width: 120px;
    font-size: 0.85rem;
  }
  .dropdown-menu a {
    padding: 0.6rem 0.8rem;
  }
  .chart-area {
    min-height: 180px;
    aspect-ratio: 4 / 3;
  }
}
</style>
