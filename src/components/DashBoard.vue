<template>
    <!-- Main Content -->
    <main class="">
      <div class="">
        <h1>Dashboard</h1>
        <VoucherTable v-if="$route.path.includes('vouchers')" />
        <TransactionTable v-if="$route.path.includes('transactions')" />
      </div>
    </main>
  
</template>

<script>

</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');


</style>
