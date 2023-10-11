// router.js

import { createRouter, createWebHistory } from 'vue-router';

//pages import
import Signup from '../pages/SignupPage.vue';//signup
import Login from '../pages/LoginPage.vue';//login page
import HomePage from '../pages/HomePage.vue';//shop page
import CompanyInner from '../pages/CompanyInner.vue'//shop company page
import ProfilePage from '../pages/ProfilePage.vue'//profile page
import DeliveryGuyPage from '../pages/DeliveryGuyPage.vue'//deliveryGuy page
import CompanyDetails from '../pages/CompanyDetails.vue' //company details, add edit products
import CompanyOrders from '../pages/CompanyOrders.vue' //company orders page
import CompanyOrderDetails from '../pages/CompanyOrderDetails.vue' //company Order Details
import UserOrders from '../pages/UserOrders.vue' //user orders page


//fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const routes = [
  {
    path: '/company',
    name:'Company Details',
    component:CompanyDetails
  },
  {
    path: '/user/orders',
    name:'User Orders',
    component:UserOrders
  },{
    path: '/company/orders/:id',
    name:'Company Order Details',
    component:CompanyOrderDetails
  },
  {
    path: '/company/orders',
    name:'Company Orders',
    component:CompanyOrders
  },
  {
    path: '/shop/company/:id',
    name:'Company',
    component:CompanyInner
  },
  {
    path: '/deliveryGuy',
    name:'DeliveryGuy',
    component:DeliveryGuyPage
  },
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
    path: '/profile',
    name:'Prodile',
    component:ProfilePage
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;