<template>
  <section class="container">
    <header class="voucher-header">
      <h2>📜 Purchased Vouchers</h2>
    </header>
 
    <!-- From-To Date Filter -->
    <form @submit.prevent="searchByDate" class="voucher-form">
      <input v-model="fromDate" type="date" required />
      <input v-model="toDate" type="date" required />
      <button type="submit" class="btn primary">🔍 Search</button>
    </form>

    <!-- Voucher Table -->
    <div class="voucher-table-container">
      <table v-if="!isMobile && paginatedVouchers.length" class="voucher-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Voucher Code</th>
            <th>Date</th>
            <th>selling</th>
            <th>created_at</th>
            <th>package</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(voucher, index) in paginatedVouchers"
            :key="voucher.id || index"
            @click="selectVoucher(voucher.code)"
            class="voucher-row"
          >
            <td>{{ voucher.id }}</td>
            <td>{{ voucher.code }}</td>
            <td>{{ voucher.expiry_date }}</td>
            <td>{{ voucher.selling_price }}</td>
            <td>{{ voucher.created_at }}</td>
            <td>{{ voucher.package }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Mobile Card Layout -->
      <div v-else-if="isMobile && paginatedVouchers.length" class="voucher-card-list">
        <div v-for="(voucher, index) in paginatedVouchers" :key="voucher.id || index" class="voucher-card" @click="selectVoucher(voucher.code)">
          <div class="voucher-card-row"><span class="label">#:</span> {{ voucher.id }}</div>
          <div class="voucher-card-row"><span class="label">Voucher Code:</span> {{ voucher.code }}</div>
          <div class="voucher-card-row"><span class="label">Date:</span> {{ voucher.expiry_date }}</div>
          <div class="voucher-card-row"><span class="label">Selling:</span> {{ voucher.selling_price }}</div>
          <div class="voucher-card-row"><span class="label">Created At:</span> {{ voucher.created_at }}</div>
          <div class="voucher-card-row"><span class="label">Package:</span> {{ voucher.package }}</div>
        </div>
      </div>
    </div>

    <!-- Pagination Component -->
    <Pagination
      v-if="filteredVouchers.length > itemsPerPage"
      :current-page="currentPage"
      :total-items="filteredVouchers.length"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
    />

    <p v-else class="no-vouchers">No vouchers found in the selected date range.</p>
  </section>
</template>

<script>
import Pagination from '../partial/Pagination.vue';
import { api } from '@/plugins/axios';

export default {
  name: 'VoucherTable',
  components: { Pagination },
  data() {
    return {
      fromDate: '',
      toDate: '',
      currentPage: 1,
      itemsPerPage: 8,
      vouchers: [],
      filteredVouchers: [],
      isMobile: false
    };
  },
  created() {
    this.getVouchers();
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  computed: {
    paginatedVouchers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredVouchers.slice(start, end);
    }
  },
  methods: {
    async getVouchers(){
      try {
          const response = await api.get('/api/vouchers');
          
          this.vouchers = response.data;
          this.filteredVouchers = this.vouchers;
        console.log(this.filteredVouchers)

      } catch (error) {
          console.error("An error occurred while fetching vouchers:", error);
          // Handle the error appropriately, e.g., show a notification or log it
      }
  },
    searchByDate() {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      if (from > to) {
        alert("⚠️ 'From Date' cannot be later than 'To Date'.");
        return;
      }

      this.filteredVouchers = this.vouchers.filter(voucher => {
        const voucherDate = new Date(voucher.date);
        return voucherDate >= from && voucherDate <= to;
      });

      this.currentPage = 1;
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    selectVoucher(voucherCode) {
      this.$emit('voucher-selected', voucherCode);
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 600;
    }
  }
};
</script>

<style scoped>
.voucher-container {
  width: 90%;
  max-width: 1200px;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.voucher-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.voucher-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.voucher-form input[type="date"] {
  padding: 0.625rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.btn {
  padding: 0.625rem 1.25rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.btn.primary {
  background-color: #2ecc71;
  color: #fff;
}
.btn.primary:hover {
  background-color: #27ae60;
}

.voucher-table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;
}

.voucher-table {
  width: 100%;
  min-width: 400px;
  border-collapse: collapse;
}
.voucher-table th,
.voucher-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}
.voucher-table th {
  background-color: #f9f9f9;
  font-weight: 700;
  color: #333;
}
.voucher-row {
  cursor: pointer;
  transition: background-color 0.2s;
}
.voucher-row:hover {
  background-color: #f0f4f8;
}
.no-vouchers {
  text-align: center;
  color: #888;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .voucher-container {
    width: 95%;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .voucher-header h2 {
    font-size: 1.25rem;
  }
  
  .voucher-form {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .voucher-form input[type="date"],
  .btn.primary {
    width: 100%;
    box-sizing: border-box; /* Ensures padding is included in the width */
  }
  
  .voucher-table th,
  .voucher-table td {
    padding: 0.6rem 0.5rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .voucher-header h2 {
    font-size: 1.1rem;
  }
  
  .voucher-table th,
  .voucher-table td {
    font-size: 0.8rem;
  }
}

.voucher-card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.voucher-card {
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  padding: 1rem;
  font-size: 14px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}
.voucher-card:hover {
  background: #f0f4f8;
}
.voucher-card-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  word-break: break-word;
}
.voucher-card-row .label {
  font-weight: 600;
  min-width: 110px;
  color: #2ecc71;
  margin-right: 0.5em;
  font-size: 13px;
}
@media (max-width: 600px) {
  .voucher-table {
    display: none;
  }
  .voucher-card-list {
    display: flex;
  }
}
@media (min-width: 601px) {
  .voucher-card-list {
    display: none;
  }
}
</style>
