<template>
  <div class="details-page" v-if="transaction">
    <header class="page-header">
      <h1 class="page-title">Transaction Details</h1>
      <router-link to="/transactions" class="back-link">&larr; Back to Transactions</router-link>
    </header>
    
    <div class="details-grid">
      <!-- Main Details Card -->
      <div class="details-card">
        <h3>Transaction Summary</h3>
        <ul class="details-list">
          <li><strong>UUID:</strong><span>{{ transaction.uuid }}</span></li>
          <li><strong>Date:</strong><span>{{ formatDate(transaction.created_at) }}</span></li>
          <li><strong>Payment Status:</strong>
            <span :class="['status-badge', transaction.is_payment_success ? 'status-success' : 'status-failed']">
              {{ transaction.is_payment_success ? 'Success' : 'Failed' }}
            </span>
          </li>
        </ul>
      </div>

      <!-- User Info Card -->
      <div class="details-card">
        <h3>User Information</h3>
        <ul class="details-list">
          <li><strong>Email:</strong><span>{{ transaction.user?.email || 'N/A' }}</span></li>
          <li><strong>Chat ID:</strong><span>{{ transaction.chat_id || 'N/A' }}</span></li>
        </ul>
      </div>

      <!-- Financial Info Card -->
      <div class="details-card">
        <h3>Financial Details</h3>
        <ul class="details-list">
          <li><strong>Total Amount:</strong><span>{{ formatCurrency(transaction.total) }}</span></li>
          <li><strong>Discount:</strong><span>{{ formatCurrency(transaction.discount) }}</span></li>
          <li><strong>Gateway:</strong><span>{{ transaction.payment_gateway }}</span></li>
        </ul>
      </div>
      
      <!-- Vouchers Card -->
      <div class="details-card vouchers-card" v-if="transaction.vouchers && transaction.vouchers.length > 0">
        <h3>Vouchers Used ({{ transaction.order_amount }})</h3>
        <div class="table-container">
          <table class="voucher-details-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="voucher in transaction.vouchers" :key="voucher.id">
                <td>{{ voucher.id }}</td>
                <td>{{ voucher.code }}</td>
                <td>{{ formatCurrency(voucher.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-state">
    <p>Loading transaction details...</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from '../../plugins/axios';

export default defineComponent({
  name: 'TransactionDetailsPage',
  data() {
    return {
      transaction: null,
    };
  },
  methods: {
    async fetchTransaction() {
      const uuid = this.$route.params.uuid;
      try {
        // Since there's no single transaction endpoint, fetch all and find the one.
        // In a real app, you'd have an endpoint like `/api/transactions/${uuid}`.
        const response = await api.get('/api/transactions');
        const foundTransaction = response.data.find(t => t.uuid === uuid);
        if (foundTransaction) {
          this.transaction = foundTransaction;
        } else {
          console.error("Transaction not found");
        }
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    formatCurrency(value) {
      if (typeof value !== 'number') return 'N/A';
      return 'Rs ' + value.toLocaleString('en-NP');
    },
  },
  created() {
    this.fetchTransaction();
  },
});
</script>

<style scoped>
.details-page {
  padding: 2rem;
  background-color: #f8f9fa;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.page-title {
  font-size: 2rem;
  font-weight: 700;
}
.back-link {
  text-decoration: none;
  color: #007bff;
  font-weight: 600;
}
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.details-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.details-card h3 {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 0.5rem;
}
.details-list {
  list-style: none;
  padding: 0;
}
.details-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.details-list span {
  font-weight: 500;
  color: #495057;
  text-align: right;
}
.status-badge {
  padding: 0.25em 0.6em;
  border-radius: 12px;
  font-size: 0.9rem;
  color: white;
}
.status-success { background-color: #28a745; }
.status-failed { background-color: #dc3545; }
.loading-state { padding: 2rem; text-align: center; }
.table-container { overflow-x: auto; }
.voucher-details-table { width: 100%; border-collapse: collapse; }
.voucher-details-table th, .voucher-details-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}
</style>