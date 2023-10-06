<script setup>
import NavBar from "@/components/NavBars/NavBar.vue";

//import ref for ref variables / onBeforeMount 
import { ref,onBeforeMount } from "vue";
//import vue router
import { useRouter } from "vue-router";

//productCompany card component
import ProductsCards from "@/components/ProductsCards.vue";

import { useStore } from "vuex";
import { useUserAuth } from "@/utils/useUserAuth";
//define router
const router = useRouter();

onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized} = await useUserAuth()
  store.dispatch('setAuth', {authorized,userType});
})


//define company products
const CompanyDetails = ref(null);

const fetchData = async () => {
  try {
    //empty headers
    var myHeaders = new Headers();

    //request options
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //extract company Id and make the fetch request
    const response = await fetch(
      `http://localhost:3000/shop/getCompanyProducts/${router.currentRoute.value.params.id}`,
      requestOptions
    );
    if (!response.ok) {
      //error handling
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //set data
    const data = await response.json();
    CompanyDetails.value = data.companies[0];
    console.log(data); // Handle the data
  } catch (error) {
    //error handling
    console.error("Error fetching data:", error);
  }
};

onBeforeMount(() => {
  //extract companyId
  fetchData();
});
</script>

<template>
  <div class="h-[100dvh] max-md:flex max-md:flex-col overflow-hidden">
    <NavBar></NavBar>
  
    <div v-if="CompanyDetails != null" class="w-full h-full  overflow-hidden">
      <img
        class="w-full h-full object-cover"
        @error="
          (event) => {
            event.target.src =
              'https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180';
          }
        "
        :src="CompanyDetails.bannerImage"
      />
    </div>
  </div>

    <div v-if=" CompanyDetails" class="flex max-md:overflow-scroll md:grid grid-cols-3 gap-5 w-[min(85%,1000px)] mx-auto mt-10">
                <ProductsCards  v-for="product in CompanyDetails.products" :Product="product" :key="product.productId"></ProductsCards>
    </div>
  
</template>
