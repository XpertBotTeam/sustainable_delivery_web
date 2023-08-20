// router.js

import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../pages/SignupPage.vue';
import Login from '../pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;