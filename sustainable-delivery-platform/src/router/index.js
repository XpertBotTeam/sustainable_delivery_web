// router.js

import { createRouter, createWebHistory } from 'vue-router';

//pages import
import Signup from '../pages/SignupPage.vue';//signup
import Login from '../pages/LoginPage.vue';//login page
import HomePage from '../pages/HomePage.vue';//shop page
import CompanyInner from '../pages/CompanyInner.vue'//shop company page
import ProfilePage from '../pages/ProfilePage.vue'//profile page
import DeliveryGuyPage from '../pages/DeliveryGuyPage.vue'//deliveryGuy page


//fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

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
  },{
    path: '/shop/company/:id',
    name:'Company',
    component:CompanyInner
  },{
    path: '/profile',
    name:'Company',
    component:ProfilePage
  },{
    path: '/deliveryGuy',
    name:'DeliveryGuy',
    component:DeliveryGuyPage
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;