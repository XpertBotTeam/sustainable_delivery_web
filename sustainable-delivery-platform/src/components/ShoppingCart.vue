<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MotorcycleImage from '../assets/MotorcycleAll.png'
import ShoppingCartCompany from './ShoppingCartCompany.vue';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { watch,ref ,computed} from 'vue';


import { useStore } from 'vuex';

const store = useStore();
const cart = computed(() => store.state.cart);

const totalPrice = ref(0);


//place order
const handlePlaceOrder = () => {
    var myHeaders = new Headers();
myHeaders.append("jwt", localStorage.getItem('JWT'));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:3000/user/placeOrder", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
        store.dispatch('clearCart')
  })
  .catch(error => console.log('error', error));
}

//console.log(cart); 
watch(() => cart.value, (newCart) => {
    totalPrice.value = 0;
    for (const order of newCart) {
        for (const item of order.items) {
          totalPrice.value += item.quantity * item.price;
        }
      }
},{ deep: true });


</script>
<template>
    <div class="w-[30%] fixed top-0 right-0 bg-white rounded-[11px] overflow-auto h-[100dvh] flex flex-col justify-between z-[200]">
        <div class=" flex flex-col">
            <div class="w-full h-[50px] rounded-[11px] bg-[#000] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]"></div>
        <div class="px-5 flex items-center justify-between py-3 border-b border-solid border-[black]">
            <img class="max-w-[100px] " :src="MotorcycleImage" alt="logo"/>
            <div class="text-black MontserratBold text-[24px]">MyCart</div>
        </div>
        <div class="flex-1 overflow-auto max-h-[420px]">
            <ShoppingCartCompany :Company="cartCompany" v-for="cartCompany in cart" :key="cartCompany._id"></ShoppingCartCompany>
            
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
                <div class="Montserrat text-[20px] uppercase">$  {{totalPrice}}</div>
            </div>
            <button @click="handlePlaceOrder" class="w-full orderButton">Place Order</button>
        </div>
    </div>
    </div>
</template>