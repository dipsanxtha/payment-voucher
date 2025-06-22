// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import DashBoard from '../components/DashBoard.vue';
import TransactionTable from '@/components/views/TransactionTable.vue';
import VoucherTable from '@/components/views/VoucherTable.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login, name: 'Login' },
  { 
    path: '/dashboard', 
    component: DashBoard, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/transactions', 
    component: TransactionTable, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/vouchers', 
    component: VoucherTable, 
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('authToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else if (to.name === 'Login' && loggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
