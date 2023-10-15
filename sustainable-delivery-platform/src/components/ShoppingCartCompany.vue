<script setup>
import ShoppingCartCompanyProduct from './ShoppingCartCompanyProduct.vue';

import { useStore } from 'vuex';
const store = useStore()

import {  defineProps,computed } from 'vue';

//define props variables
const props = defineProps(["Company"]);

const totalOrder = computed(() => {
      return props.Company.items.reduce((total, item) => {
        return total + (item.quantity * item.price);
      }, 0);
    });


    const handleAddToCart = async (productId) =>{
  const companyId = props.Company.companyId;
  const product = await props.Company.items.filter(item => {
    return item.id === productId;
  });


  try{
  //request headers
  var myHeaders = new Headers();
  myHeaders.append(
    "jwt",
     localStorage.getItem('JWT')
  );

  //request option
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: "",
    redirect: "follow",
  };

  const result = await fetch(
    `http://localhost:3000/user/addToCart?companyId=${companyId}&productId=${productId}`,
     requestOptions
  );
  
  if(!result.ok){
    console.log(result.json());
  }else{
    store.dispatch('addToCart', { companyId, product: {id:productId,price: product.price,name:product.name}, quantity:1 ,companyName: props.Company.name});
    toast.success('added to cart succesfully')
  }
   }catch(err){
     //error handling
     console.log(err)
   }
};

const handleRemoveFromCart = async (productId) => {
  const companyId = props.Company.companyId;
  const product = await props.Company.items.filter(item => {
    return item.id === productId;
  });
  
  try{
  //request headers
  var myHeaders = new Headers();
  myHeaders.append(
    "jwt",
     localStorage.getItem('JWT')
  );

  //request option
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: "",
    redirect: "follow",
  };

  const result = await fetch(
    `http://localhost:3000/user/removeFromCart?companyId=${companyId}&productId=${productId}`,
     requestOptions
  );
  
  if(!result.ok){
    console.log(result.json());
  }else{
    store.dispatch('removeFromCart', { companyId, product: {id:productId}, quantity:1 });
    toast.success('remove from cart')
  }
   }catch(err){
     //error handling
     console.log(err)
   }
};
    
</script>
<template>
        <div class="px-5 flex items-center justify-between py-3 bg-[#FF9900]">
            <div class="DarkerGrotesque text-[24px]">{{props.Company.companyName}}</div>
            <button class="orderButton">View Store</button>
        </div>
        <ShoppingCartCompanyProduct @addToCart="handleAddToCart" @removeFromCart="handleRemoveFromCart" @clearFromCart="handleClearCart" v-for="product in Company.items" :product="product" :key="product.id"></ShoppingCartCompanyProduct>
       
        <div class="px-5 flex items-center justify-between py-3 border-b border-dashed border-[#7D7777] gap-5 ">
            <div class="Montserrat text-[16px] uppercaseMontserrat text-[16px] uppercase">Subtotal</div>
            <div class="Montserrat text-[16px] uppercase">$ {{totalOrder}}</div>
        </div>
</template>