<script setup>
    import { defineProps } from 'vue';

//define props variables
const props = defineProps(["Product"]);

</script>

<template>
    <div class="w-full rounded-[42px] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5">
        <img class="w-full mb-5" :src="props.Product.productId.imagePath" />

        <div>
            <div class="mb-5">
                <div class="MontserratBold text-[14px] text-[black]">{{ props.Product.productId.name }}</div>
                <div class="Roboto text-[12px] text-[#8B8B8B]">{{ props.Product.productId.description }}</div>
            </div>

            <div class="Roboto text-[14px] mb-[10px]">$<b>{{ props.Product.productId.price }}</b></div>
            <button class="text-white bg-[black] text-[16px] rounded-[12px] px-3 py-1 DarkerGrotesque">Add to cart</button>
        </div>
    </div>
</template>