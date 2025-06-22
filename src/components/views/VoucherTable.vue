<template>
  <section class="voucher-container">
    <header class="voucher-header">
      <h2>📜 Purchased Vouchers</h2>
    </header>

    <!-- Register & Auto Generate Options -->
    <form @submit.prevent="registerVoucher" class="voucher-form">
      <input
        v-model.trim="voucherCode"
        type="text"
        placeholder="Enter Voucher Code"
        required
      />
      <button type="submit" class="btn primary">+ Register Voucher</button>
      <button type="button" @click="generateVoucher" class="btn secondary">
        🔄 Auto Generate Voucher
      </button>
    </form>

    <!-- Voucher Table -->
    <table v-if="vouchers.length" class="voucher-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Voucher Code</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(voucher, index) in vouchers" :key="voucher.id || index">
          <td>{{ voucher.id }}</td>
          <td>{{ voucher.code }}</td>
          <td>{{ voucher.date }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-vouchers">No vouchers available.</p>
  </section>
</template>

<script>
export default {
  name: 'VoucherTable',
  data() {
    return {
      voucherCode: '',
      vouchers: [
        { id: 1, code: 'VCH1001', date: '2025-06-10' },
        { id: 2, code: 'VCH1002', date: '2025-06-17' }
      ]
    };
  },
  methods: {
    registerVoucher() {
      const code = this.voucherCode.trim().toUpperCase();
      if (!code) return;

      const newId = this.vouchers.length + 1;
      const today = new Date().toISOString().split('T')[0];

      this.vouchers.push({
        id: newId,
        code,
        date: today
      });

      this.voucherCode = '';
    },
    generateVoucher() {
      const newId = this.vouchers.length + 1;
      const code = `VCH${String(1000 + newId)}`;
      const today = new Date().toISOString().split('T')[0];

      this.vouchers.push({
        id: newId,
        code,
        date: today
      });
    }
  }
};
</script>

<style scoped>
.voucher-container {
  width: 80%;
  max-width: 1200px;
  margin-top: 2rem;
  padding: 2rem;
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

.voucher-form input {
  flex: 1 1 300px;
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

.btn.secondary {
  background-color: #3498db;
  color: #fff;
}

.btn.secondary:hover {
  background-color: #2980b9;
}

.voucher-table {
  width: 100%;
  border-collapse: collapse;
}

.voucher-table th,
.voucher-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.voucher-table th {
  background-color: #f9f9f9;
  font-weight: 700;
  color: #333;
}

.no-vouchers {
  text-align: center;
  color: #888;
  margin-top: 2rem;
}
</style>
