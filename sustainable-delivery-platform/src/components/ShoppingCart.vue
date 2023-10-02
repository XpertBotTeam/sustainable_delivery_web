<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MotorcycleImage from '../assets/MotorcycleAll.png'
import ShoppingCartCompany from './ShoppingCartCompany.vue';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
    <div class="w-[25%] fixed top-0 right-0 bg-white rounded-[11px] overflow-auto h-[100dvh] flex flex-col justify-between">
        <div class=" flex flex-col">
            <div class="w-full h-[50px] rounded-[11px] bg-[#000] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]"></div>
        <div class="px-5 flex items-center justify-between py-3 border-b border-solid border-[black]">
            <img class="max-w-[100px] " :src="MotorcycleImage" alt="logo"/>
            <div class="text-black MontserratBold text-[24px]">MyCart</div>
        </div>
        <div class="flex-1 overflow-auto max-h-[420px]">
            <ShoppingCartCompany></ShoppingCartCompany>
            <ShoppingCartCompany></ShoppingCartCompany>
            <ShoppingCartCompany></ShoppingCartCompany>
        </div>
        </div>
        
        <div>
        <div class="px-5 flex items-center justify-between py-3 bg-[black]">
            <FontAwesomeIcon class="text-white" :icon="faCartShopping"></FontAwesomeIcon>
            <div class="Montserrat text-white text-[24px] uppercase"> My Cart</div>
        </div>

        <div class="px-5  pb-10 pt-3 bg-white">
            <div class="flex items-center justify-between mb-10">
                <div class="Montserrat text-[20px] uppercase">Total</div>
                <div class="Montserrat text-[20px] uppercase">$ 200</div>
            </div>
            <button class="w-full orderButton">Go to checkout</button>
        </div>
    </div>
    </div>
</template>