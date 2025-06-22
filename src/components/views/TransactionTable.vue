<template>
  <section class="transaction">
    <header class="transaction__header">
      <h2 class="transaction__title">Transaction List</h2>
    </header>

    <table class="transaction__table">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Amount (Rs)</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="txn in transactions" :key="txn.id">
          <td>{{ txn.id }}</td>
          <td>{{ txn.description }}</td>
          <td>{{ formatCurrency(txn.amount) }}</td>
          <td>{{ formatDate(txn.date) }}</td>
          <td>
            <button
              class="transaction__delete-btn"
              @click="deleteTransaction(txn.id)"
              aria-label="Delete Transaction"
              title="Delete"
            >
              🗑️
            </button>
          </td>
        </tr>
        <tr v-if="transactions.length === 0">
          <td colspan="5" class="transaction__empty">No transactions found.</td>
        </tr>
      </tbody>
    </table>

    <footer class="transaction__footer">
      <span><strong>Total:</strong> Rs {{ formatCurrency(totalAmount) }}</span>
    </footer>
  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionList',
  data() {
    return {
      transactions: [
        { id: 1, description: 'Purchase: Headphones', amount: 1500, date: '2025-06-15' },
        { id: 2, description: 'Subscription: Netflix', amount: 999, date: '2025-06-16' },
        { id: 3, description: 'Bought Grocery', amount: 2345, date: '2025-06-17' },
        { id: 4, description: 'Electricity Bill', amount: 1850, date: '2025-06-18' },
        { id: 5, description: 'Movie Ticket', amount: 500, date: '2025-06-19' },
        { id: 6, description: 'Gym Membership', amount: 2500, date: '2025-06-20' }
      ]
    };
  },
  computed: {
    totalAmount() {
      return this.transactions.reduce((sum, txn) => sum + txn.amount, 0);
    }
  },
  methods: {
    deleteTransaction(id) {
      this.transactions = this.transactions.filter(txn => txn.id !== id);
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-IN', options);
    },
    formatCurrency(value) {
      return value.toLocaleString('en-IN');
    }
  }
});
</script>

<style scoped>
.transaction {
  width: 80%;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.transaction__header {
  text-align: center;
  margin-bottom: 1rem;
}

.transaction__title {
  font-size: 24px;
  color: #2f3640;
}

.transaction__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.transaction__table th,
.transaction__table td {
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.transaction__table th {
  background-color: #f1f2f6;
  color: #333;
  font-weight: 600;
}

.transaction__delete-btn {
  background: none;
  border: none;
  color: #c0392b;
  font-size: 16px;
  cursor: pointer;
}

.transaction__delete-btn:hover {
  color: #e74c3c;
}

.transaction__empty {
  text-align: center;
  font-style: italic;
  color: #999;
  padding: 16px 0;
}

.transaction__footer {
  margin-top: 1rem;
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
