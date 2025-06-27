// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import DashBoard from '../components/DashBoard.vue';
import TransactionTable from '@/components/views/TransactionTable.vue';
import NewTransactionTable from '@/components/views/NewTransactionTable.vue';
import VoucherTable from '@/components/views/VoucherTable.vue';
import ProfilePage from '@/components/views/Profile.vue';
import { hasToken } from '@/utils/token'; 

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true } // ✅ this improves readability
  },
  {
    path: '/dashboard',
    component: DashBoard,
    meta: { requiresAuth: true }
  },
  {
    path: '/transactions',
    component: TransactionTable,
    meta: { guestOnly: true }
  },
  {
    path: '/vouchers',
    component: VoucherTable,
    meta: { guestOnly: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { guestOnly: true }
  },
  {
    path: '/transactions/:uuid',
    name: 'TransactionDetails',
    component: NewTransactionTable,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Global navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = hasToken(); // ✅ uses token utility

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 🔒 Route needs auth but user not logged in
    return next({ name: 'Login' });
  }

  if (to.meta.guestOnly && isLoggedIn) {
    // 🚫 Logged-in users shouldn't access login page
    return next('/dashboard');
  }

  next(); // ✅ Allow route
});

export default router;
