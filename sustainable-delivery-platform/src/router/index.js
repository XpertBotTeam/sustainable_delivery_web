// router.js

import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../pages/SignupPage.vue';
import Login from '../pages/LoginPage.vue';
import HomePage from '../pages/HomePage.vue';

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
  },{
    path: '/home',
    name:'HomePage',
    component:HomePage
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;