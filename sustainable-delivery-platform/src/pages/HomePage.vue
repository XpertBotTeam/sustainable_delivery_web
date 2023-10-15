<template>
  <div v-if="productCompanies!==null" class="bg-gradient-to-b from-[#F7F7F7] to-[#D5D4D433]">
    <NavBar></NavBar>
  
    <CarouselSlider :images="[Nike,Castania,MaisonVerte]"></CarouselSlider>

    <NavBarSecondary @cartPress="()=>{handleCart = !handleCart}"></NavBarSecondary>
    
    <ShoppingCart v-show="handleCart"></ShoppingCart>

    <div v-for="products in productCompanies.companies" :key="products.id">
      <CompanyProducts :CompanyProduct="products"></CompanyProducts>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

//navbars
import NavBar from "@/components/NavBars/NavBar.vue";
import NavBarSecondary from "@/components/NavBars/NavBarSecondary.vue";

//import Images
import Nike from '../assets/Nike.png'
import Castania from '../assets/Castania.png'
import MaisonVerte from '../assets/MaisonVerte.png'


//companyProducts component
import CompanyProducts from "@/components/CompanyProducts.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
import CarouselSlider from "@/components/CarouselSlider.vue";

//auth related utils and methods
import { useUserAuth } from "@/utils/useUserAuth";
import { useStore } from "vuex";


//const { authorized } = await useUserAuth();

onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized,user} = await useUserAuth()
  store.dispatch('setInitialCart')
  store.dispatch('setAuth', {authorized,userType});
  store.dispatch('setUser',{user})

  //fetching data (company products)
  fetchData();
})

//define ref variables
const productCompanies = ref(null); //(company products)
const handleCart = ref(false);

const fetchData = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/shop/getCompanyProducts"
    );

    if (!response.ok) {
      //error handling
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //set data
    const data = await response.json();
    productCompanies.value = data;
    console.log(data); 

  } catch (error) {
    //error handling
    console.error("Error fetching data:", error);
  }
};

</script>
