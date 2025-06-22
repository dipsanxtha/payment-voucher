<template>
  <aside class="sidebar" :class="{ collapsed: !isSidebarOpen }">
    <!-- Logo and Toggle -->
    <div class="logo-wrapper">
      <img
        src="https://i.pinimg.com/736x/65/7c/e2/657ce27b552591220b251e3c8bfd6334.jpg"
        alt="Logo"
        class="logo"
      />
      <button class="toggle-btn" @click="toggleSidebar">
        <i :class="isSidebarOpen ? 'fas fa-angle-left' : 'fas fa-angle-right'"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="nav">
      <router-link to="/dashboard" :class="{ active: $route.path === '/dashboard' }">
        <i class="fas fa-home"></i>
        <span v-if="isSidebarOpen">Dashboard</span>
      </router-link>
      <router-link to="/vouchers" :class="{ active: $route.path === '/vouchers' }">
        <i class="fas fa-file-invoice"></i>
        <span v-if="isSidebarOpen">Vouchers</span>
      </router-link>
      <router-link to="/transactions" :class="{ active: $route.path === '/transactions' }">
        <i class="fas fa-credit-card"></i>
        <span v-if="isSidebarOpen">Transactions</span>
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="logout-btn-wrapper">
      <button class="logout-btn" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
        <span v-if="isSidebarOpen">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isSidebarOpen: true
    };
  },
  watch: {
    isSidebarOpen(newVal) {
      this.$emit('toggle', newVal);
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.sidebar {
  width: 240px;
  background-color: #1f2d3d;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 12px;
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 80px;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  transition: 0.3s;
}

.sidebar.collapsed .logo {
  width: 40px;
  height: 40px;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav a {
  display: flex;
  align-items: center;
  color: #bdc3c7;
  text-decoration: none;
  font-size: 15px;
  padding: 10px 12px;
  border-radius: 6px;
  transition: background 0.3s;
}

.nav a i {
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.nav a.active,
.nav a:hover {
  background-color: #2d3e50;
  color: #fff;
}

.logout-btn-wrapper {
  text-align: center;
  margin-top: auto;
}

.logout-btn {
  background-color: #79261d;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  transition: background 0.3s;
}

.logout-btn:hover {
  background-color: #a43427;
}
</style>
