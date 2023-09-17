 <script setup>
    import { defineProps } from 'vue';
    //import products cards
    import ProductsCards from './ProductsCards.vue'

    //define vue router
    import { useRouter } from 'vue-router';
    const router = useRouter();

    //svg icon
    import SvgIcon from '../components/SvgIcon.vue'

    //define props variables
    const props = defineProps(["CompanyProduct"]);
</script>

<template>
    <div class= "mb-10 md:mb-20">
        <div class="w-full" v-if="props.CompanyProduct">
        <img class=" w-full max-h-[300px]  mb-10" @error="(event) => { event.target.src = 'https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180' }" :src="props.CompanyProduct.bannerImage"/>
    </div>

        <div class="w-[85%] mx-auto">
            <div class="w-full flex justify-between mb-10">
                <div class="px-5 py-1  rounded-[12px] bg-[#FFAB08] flex items-center justify-center w-fit DarkerGrotesque text-white text-[18px]">Best Seller</div>

                <div @click.prevent="()=>{router.push(`/shop/company/${props.CompanyProduct._id}`)}" class="DarkerGrotesque w-fit cursor-pointer">
                    <div class="text-[16px] viewall">view all</div>
                    <div class="w-fit ml-auto"><SvgIcon class="" iconName="More"></SvgIcon></div>
                </div>
            </div>

            <div v-if=" props.CompanyProduct" class="flex max-md:overflow-scroll md:grid grid-cols-3 gap-5 max-w-full">
                <ProductsCards  v-for="product in props.CompanyProduct.products.slice(0,3)" :Product="product" :key="product.productId"></ProductsCards>
            </div>
        </div>
    </div>
</template>