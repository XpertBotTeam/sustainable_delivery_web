<template>
  <div v-if="productCompanies!==null" class="bg-gradient-to-b from-[#F7F7F7] to-[#D5D4D433]">
    <NavBar></NavBar>
    <div v-for="products in productCompanies.companies" :key="products.id">
      <CompanyProducts :CompanyProduct="products"></CompanyProducts>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import NavBar from "@/components/NavBar.vue";

//companyProducts component
import CompanyProducts from "@/components/CompanyProducts.vue";

//define company products
const productCompanies = ref(null);

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
    console.log(data); // Handle the data here
  } catch (error) {
    //error handling
    console.error("Error fetching data:", error);
  }
};

onBeforeMount(() => {
  fetchData();
});
</script>
