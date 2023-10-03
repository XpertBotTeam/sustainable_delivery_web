<script setup>
import ShoppingCartCompanyProduct from './ShoppingCartCompanyProduct.vue';


import { defineProps } from 'vue';

//define props variables
const props = defineProps(["Company"]);
</script>
<template>
        <div class="px-5 flex items-center justify-between py-3 bg-[#FF9900]">
            <div class="DarkerGrotesque text-[24px]">{{props.Company.companyName}}</div>
            <button class="orderButton">View Store</button>
        </div>
        <ShoppingCartCompanyProduct v-for="product in Company.items" :product="product" :key="product.id"></ShoppingCartCompanyProduct>
       
        <div class="px-5 flex items-center justify-between py-3 border-b border-dashed border-[#7D7777] gap-5 ">
            <div class="Montserrat text-[16px] uppercaseMontserrat text-[16px] uppercase">Subtotal</div>
            <div class="Montserrat text-[16px] uppercase">$ 200</div>
        </div>
</template>