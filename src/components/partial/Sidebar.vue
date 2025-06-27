<template>
  <aside class="sidebar" :class="{ collapsed: !isSidebarOpen }">
    <!-- Profile Section -->
    <!-- <div class="profile-section">
      <div v-if="isSidebarOpen" class="profile-info">
        <div class="profile-name">John Doe</div>
        <div class="profile-email">john.doe@email.com</div>
        <div class="profile-role">Admin</div>
        <button class="view-profile-btn">View Profile</button> -->
      <!-- </div>
    </div> -->
    <!-- Logo and Toggle -->
    <div class="logo-wrapper">
      <img
        src="https://i.pinimg.com/736x/27/25/51/272551f228fc74d104cc3aece28430b4.jpg"
        alt="Logo"
        class="logo"
      />
      <button class="toggle-btn" @click="toggleSidebar">
        <i :class="isSidebarOpen ? 'fas fa-angle-left' : 'fas fa-angle-right'"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="nav">
      <router-link to="/profile" :class="{ active: $route.path === '/profile' }">
        <i class="fas fa-user"></i>
        <span v-if="isSidebarOpen">Profile</span>
      </router-link>
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

import { removeToken } from '@/utils/token';

export default {
  name: 'Sidebar',
  data() {
    return {
      isSidebarOpen: true
    };
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenWidth);
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
    removeToken();
    this.$router.push('/login');
  },
  checkScreenWidth() {
      if (window.innerWidth <= 768) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
  }

  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
  transition: all 0.3s;
  padding-top: 1rem; /* Add padding to compensate for removed image */
}
.profile-info {
  text-align: center;
  width: 100%;
}
.profile-name {
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  margin-bottom: 2px;
}
.profile-email {
  font-size: 13px;
  color: #bdc3c7;
  word-break: break-all;
}
.profile-role {
  font-size: 13px;
  color: #7ed957; /* A green color for role */
  margin-top: 4px;
  font-weight: 500;
}
.view-profile-btn {
  margin-top: 10px;
  background: #34495e;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}
.view-profile-btn:hover {
  background: #4e6a85;
}
.sidebar.collapsed .profile-section {
  margin-bottom: 10px;
}
.sidebar.collapsed .profile-info {
  display: none;
}

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

/* Responsive Styles */
@media (max-width: 768px) {
  .sidebar {
    width: 80px; /* Collapsed width */
  }
  .sidebar:not(.collapsed) {
    width: 240px; /* Expanded width for temporary view */
  }
}
</style>
