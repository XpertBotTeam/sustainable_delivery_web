<script setup>
import ShoppingCartCompanyProduct from './ShoppingCartCompanyProduct.vue';


</script>
<template>
        <div class="px-5 flex items-center justify-between py-3 bg-[#FF9900]">
            <div class="DarkerGrotesque text-[24px]">Plein Soleil</div>
            <button class="orderButton">View Store</button>
        </div>
        <ShoppingCartCompanyProduct ></ShoppingCartCompanyProduct>
        <ShoppingCartCompanyProduct ></ShoppingCartCompanyProduct>
        <ShoppingCartCompanyProduct ></ShoppingCartCompanyProduct>

        <div class="px-5 flex items-center justify-between py-3 border-b border-dashed border-[#7D7777] gap-5 ">
            <div class="Montserrat text-[16px] uppercaseMontserrat text-[16px] uppercase">Subtotal</div>
            <div class="Montserrat text-[16px] uppercase">$ 200</div>
        </div>
</template>