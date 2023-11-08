<script setup>
import { defineProps } from 'vue';

//define props variables
const props = defineProps(['item'])
</script>
<template>
    

<div class="flex gap-5 items-start mb-5">
    <img class="max-w-[100px]" @error="(e)=>{e.target.src = 'https://commercial.bunn.com/img/image-not-available.png'}"  :src="props.item.product.imagePath" alt="product"/>
    <div>
<div class="Montserrat text-[18px]  duration-[300ms] cursor-pointer ">{{ props.item.product.name }}</div>
<div class="Roboto text-[18px] text-[#929292] group-hover:text-white duration-[300ms] cursor-pointer mb-5">{{ props.item.product.price }} $</div>
</div>
<div class="Montserrat text-[18px]   duration-[300ms] cursor-pointer ">X{{ props.item.quantity }}</div>
</div>

</template>