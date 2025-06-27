<template>
  <section class="transaction">
    <header class="transaction__header">
      <h2 class="transaction__title">Transaction List</h2>
    </header>
    <div class="transaction__filter">
      <form class="transaction__filter-form" @submit.prevent="applyFilters">
        <input
          v-model="filterDescription"
          type="text"
          placeholder="Description..."
          class="transaction__desc-input"
        />
        <input
          v-model="filterDate"
          type="date"
          class="transaction__date-input"
        />
        <button type="submit" class="transaction__filter-btn">Submit</button>
      </form>
    </div>
    <div class="transaction__table-container">
      <table class="transaction__table" v-if="!isMobile">
        <thead>
          <tr>
            <th>uuid</th>
            <th>Email</th>
            <th>Discount</th>
            <th>created_at</th>
            <th>is_payment_success</th>
            <th>payment_gateway</th>
            <th>chat_id</th>
            <th>total</th>
            <th>Vouchers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="txn in paginatedTransactions" :key="txn.uuid">
            <td data-label="uuid">
              <router-link :to="`/transactions/${txn.uuid}`" class="uuid-link">
                {{ txn.uuid }}
              </router-link>
            </td>
            <td>{{ txn.user?.email }}</td>
            <td>{{ txn.discount }}</td>
            <td>{{ formatDate(txn.created_at) }}</td>
            <td>{{ txn.is_payment_success }}</td>
            <td>{{ txn.payment_gateway }}</td>
            <td>{{ txn.chat_id }}</td>
            <td>{{ formatCurrency(txn.total) }}</td>
            <td>
              <button
                v-if="txn.order_amount"
                class="transaction__view-voucher-btn"
                @click="showVoucherDetails(txn)"
              >
                {{ txn.order_amount }} Vouchers
              </button>
              <span v-else>N/A</span>
            </td>
          </tr>
          <tr v-if="filteredTransactions.length === 0">
            <td colspan="9" class="transaction__empty">No transactions found.</td>
          </tr>
        </tbody>
      </table>
      <!-- Mobile Card Layout -->
      <div v-else class="transaction__card-list">
        <div v-for="txn in paginatedTransactions" :key="txn.uuid" class="transaction__card">
          <div class="transaction__card-row"><span class="label">uuid:</span>
            <router-link :to="`/transactions/${txn.uuid}`" class="uuid-link">{{ txn.uuid }}</router-link>
          </div>
          <div class="transaction__card-row"><span class="label">Email:</span> {{ txn.user?.email }}</div>
          <div class="transaction__card-row"><span class="label">Discount:</span> {{ txn.discount }}</div>
          <div class="transaction__card-row"><span class="label">created_at:</span> {{ formatDate(txn.created_at) }}</div>
          <div class="transaction__card-row"><span class="label">is_payment_success:</span> {{ txn.is_payment_success }}</div>
          <div class="transaction__card-row"><span class="label">payment_gateway:</span> {{ txn.payment_gateway }}</div>
          <div class="transaction__card-row"><span class="label">chat_id:</span> {{ txn.chat_id }}</div>
          <div class="transaction__card-row"><span class="label">total:</span> {{ formatCurrency(txn.total) }}</div>
          <div class="transaction__card-row"><span class="label">Vouchers:</span>
            <button v-if="txn.order_amount" class="transaction__view-voucher-btn" @click="showVoucherDetails(txn)">
              {{ txn.order_amount }} Vouchers
            </button>
            <span v-else>N/A</span>
          </div>
        </div>
        <div v-if="filteredTransactions.length === 0" class="transaction__empty">No transactions found.</div>
      </div>
    </div>

    <Pagination
      v-if="filteredTransactions.length > itemsPerPage"
      :current-page="currentPage"
      :total-items="filteredTransactions.length"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
    />

    <footer class="transaction__footer">
      <div class="transaction__summary">
        <span><strong>Vouchers Used:</strong> {{ vouchersUsedCount }}</span>
        <span><strong>Total:</strong> Rs {{ formatCurrency(totalAmount) }}</span>
      </div>
    </footer>

    <!-- Modal for Voucher Details -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h3>Voucher Details</h3>
        <table v-if="selectedTransaction.vouchers?.length" class="voucher-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Voucher Code</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Formatted Date</th>
              <th>Voucher No</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Payment Success</th>
              <th>Gateway</th>
              <th>Order Amount</th>
              <th>Chat ID</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(voucher, index) in selectedTransaction.vouchers"
              :key="voucher.id || index"
              class="voucher-row"
            >
              <td>{{ voucher.id }}</td>
              <td>{{ voucher.code }}</td>
              <td>{{ voucher.date }}</td>
              <td>{{ formatCurrency(voucher.amount) }}</td>
              <td>{{ formatDate(voucher.date) }}</td>
              <td>{{ voucher.voucherNo }}</td>
              <td>{{ voucher.user?.email }}</td>
              <td>{{ voucher.created_at }}</td>
              <td>{{ voucher.is_payment_success }}</td>
              <td>{{ voucher.payment_gateway }}</td>
              <td>{{ voucher.order_amount }}</td>
              <td>{{ voucher.chat_id }}</td>
            </tr>
          </tbody>
        </table>
        <button class="close-btn" @click="showModal = false">Close</button>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import Pagination from '../partial/Pagination.vue';
import { api } from '../../plugins/axios';

export default defineComponent({
  name: 'TransactionList',
  props: {
    selectedVoucher: {
      type: String,
      default: null
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      searchTerm: '',
      filterDescription: '',
      filterDate: '',
      currentPage: 1,
      itemsPerPage: 8,
      showModal: false,
      selectedTransaction: null,
      transactions: [],
      isMobile: false
    };
  },
  created() {
    this.getTransactions();
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  computed: {
    filteredTransactions() {
      let transactions = this.transactions;
      if (this.selectedVoucher) {
        transactions = transactions.filter(txn => txn.voucherNo === this.selectedVoucher);
      }
      if (this.filterDescription) {
        const desc = this.filterDescription.toLowerCase();
        transactions = transactions.filter(txn =>
          txn.description?.toLowerCase().includes(desc)
        );
      }
      if (this.filterDate) {
        transactions = transactions.filter(txn => txn.date === this.filterDate);
      }
      return transactions;
    },
    totalAmount() {
      return this.filteredTransactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);
    },
    vouchersUsedCount() {
      return this.filteredTransactions.filter(txn => txn.voucherNo).length;
    },
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTransactions.slice(start, end);
    }
  },
  methods: {
    async getTransactions() {
      try {
        const response = await api.get('/api/transactions');
        this.transactions = response.data;
      } catch (error) {
        console.error("An error occurred while fetching transactions:", error);
      }
    },
    showVoucherDetails(transaction) {
      this.selectedTransaction = transaction;
      this.showModal = true;
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-IN', options);
    },
    formatCurrency(value) {
      return value ? value.toLocaleString('en-IN') : 'N/A';
    },
    applyFilters() {
      this.currentPage = 1;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 600;
    }
  },
  watch: {
    searchTerm() {
      this.currentPage = 1;
    },
    selectedVoucher() {
      this.currentPage = 1;
    }
  }
});
</script>

<style scoped>
/* Base Reset and Container */
.transaction {
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
}

/* Header */
.transaction__header {
  text-align: center;
  margin-bottom: 1rem;
}
.transaction__title {
  font-size: 24px;
  color: #2f3640;
}

/* Filters */
.transaction__filter {
  margin-bottom: 1.2rem;
}
.transaction__filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
}
.transaction__desc-input,
.transaction__date-input {
  padding: 8px 14px;
  border: 1px solid #d1d8e0;
  border-radius: 6px;
  font-size: 15px;
  width: 180px;
}
.transaction__filter-btn {
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  background: #4a90e2;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.transaction__filter-btn:hover {
  background: #357abd;
}

/* Table */
.transaction__table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;
  position: relative;
}
.transaction__table-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to left, #fff 60%, rgba(255,255,255,0));
  display: none;
}
@media (max-width: 1024px) {
  .transaction__table-container::after {
    display: block;
  }
}
.transaction__table {
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  font-size: 14px;
}
.transaction__table th,
.transaction__table td {
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}
.transaction__table th {
  background-color: #f1f2f6;
  color: #333;
  font-weight: 600;
}
.transaction__view-voucher-btn {
  background: #4a90e2;
  color: #fff;
  border: none;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}
.transaction__view-voucher-btn:hover {
  background: #357abd;
}
.transaction__empty {
  text-align: center;
  font-style: italic;
  color: #999;
  padding: 16px 0;
}

/* Footer Summary */
.transaction__footer {
  margin-top: 1rem;
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
}
.transaction__summary {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  min-width: 300px;
  max-width: 95%;
  max-height: 90vh;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.25);
  overflow-x: auto;
  overflow-y: auto;
}
.close-btn {
  margin-top: 1rem;
  padding: 8px 16px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.close-btn:hover {
  background: #c0392b;
}
.voucher-table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  margin-top: 1rem;
}
.voucher-table th,
.voucher-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .transaction__filter-form {
    justify-content: flex-start;
    gap: 12px;
  }
  .transaction__table {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .transaction {
    width: 95%;
    padding: 1rem;
  }

  .transaction__header {
    text-align: center;
  }

  .transaction__filter-form {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .transaction__desc-input,
  .transaction__date-input,
  .transaction__filter-btn {
    width: 100%;
    font-size: 14px;
  }

  .transaction__table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 1rem;
  }

  .transaction__table {
    font-size: 12.5px;
    min-width: 700px;
  }

  .transaction__summary {
    justify-content: space-between;
    gap: 1rem;
  }

  .modal {
    padding: 1rem;
    width: 90%;
    max-height: 85vh;
  }

  .voucher-table th,
  .voucher-table td {
    font-size: 13px;
    padding: 6px;
  }
}

@media (max-width: 480px) {
  .transaction {
    padding: 0.8rem;
  }

  .transaction__title {
    font-size: 20px;
  }

  .transaction__table th,
  .transaction__table td {
    font-size: 11.5px;
    padding: 7px 4px;
  }

  .voucher-table th,
  .voucher-table td {
    font-size: 11px;
    padding: 5px 3px;
  }

  .close-btn {
    font-size: 14px;
    padding: 6px 12px;
  }

  .modal {
    padding: 0.5rem;
    width: 98%;
    max-height: 80vh;
  }
}

.uuid-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}
.uuid-link:hover {
  text-decoration: underline;
}

.transaction__card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.transaction__card {
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  padding: 1rem;
  font-size: 14px;
  margin-bottom: 0.5rem;
}
.transaction__card-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  word-break: break-word;
}
.transaction__card-row .label {
  font-weight: 600;
  min-width: 110px;
  color: #4a90e2;
  margin-right: 0.5em;
  font-size: 13px;
}
@media (max-width: 600px) {
  .transaction__table {
    display: none;
  }
  .transaction__card-list {
    display: flex;
  }
}
@media (min-width: 601px) {
  .transaction__card-list {
    display: none;
  }
}
/* Modal voucher table scrollable on mobile */
@media (max-width: 600px) {
  .voucher-table {
    min-width: 600px;
    font-size: 12px;
  }
  .modal {
    padding: 0.5rem;
    width: 99%;
    max-height: 80vh;
  }
}
</style>
