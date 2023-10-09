<script setup>
import NavBar from "@/components/NavBars/NavBar.vue";

//import ref for ref variables / onBeforeMount 
import { ref,onBeforeMount } from "vue";
//import vue router
//import { useRouter } from "vue-router";

//productCompany card component
import ProductsCards from "@/components/ProductsCards.vue";

import { useStore } from "vuex";
import { useUserAuth } from "@/utils/useUserAuth";
import ProductsAddCard from "@/components/ProductsAddCard.vue";
import AddProduct from "@/components/AddProduct.vue";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//define router
//const router = useRouter();

onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized} = await useUserAuth()
  store.dispatch('setAuth', {authorized,userType});
})

//define company products
const CompanyDetails = ref(null);
const addProduct = ref(false);
const productEditId = ref(null)

//handleFileOpener
const handleFileopener = ()=> {
  const InputFile = document.getElementById('fileUpload');
  InputFile.click();

   InputFile.addEventListener('change' , (event) => {
  const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      document.querySelector('.bannerImage').src = reader.result;
    }

    reader.readAsDataURL(file);

    updateImage(event.target.files[0]);
})
}

const updateImage = (file) => {
  
  //adjust request headers
  var myHeaders = new Headers();
myHeaders.append("jwt",localStorage.getItem('JWT'));

//body request
const Fd = new FormData();
Fd.append("imagePath", file);  // Add any additional fields as needed

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: Fd,  // Use the FormData object
  redirect: 'follow'
};

fetch("http://localhost:3000/company/updateBanner", requestOptions)
  .then(response => response.json())
  .then(result =>{if(result){
    alert('done')
  }})
  .catch(error => console.log('error', error))

}


//deleting products
const handleDeleteProduct = (productId) => {
  if(confirm('are you sure you want to delete product?')){
    var myHeaders = new Headers();
    myHeaders.append("jwt", localStorage.getItem('JWT'));


var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://localhost:3000/company/deleteProduct/${productId}`, requestOptions)
  .then(response => response.text())
  .then(result => {if(result.ok){alert('deleted succesfully')}})
  .catch(error => console.log('error', error));
  }
}


//toggle view addProduct
const toggleAddProduct = (event) => {
  //event value is the product id emited from the product for editing, if not found thus we are adding new product

  if(event.target ===undefined){
    productEditId.value = event
  }else{
    productEditId.value= null
  }

  addProduct.value = !addProduct.value
}


const fetchData = async () => {
  try {
    //empty headers
    var myHeaders = new Headers();
    myHeaders.append("jwt", localStorage.getItem('JWT'));


    //request options
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


    //extract company Id and make the fetch request
    const response = await fetch(
      `http://localhost:3000/shop/company/getCompanyProducts`,
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
      <div class=" relative group w-full max-h-full">
        <input id="fileUpload" type="file" class="hidden" />
        
        <img
        class="w-full h-full object-cover group-hover:brightness-[.8] brightness-[1] duration-[300ms] bannerImage"
        @error="
          (event) => {
            event.target.src =
            'https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180';
          }
          "
        :src="CompanyDetails.bannerImage"
        />
        <button @click="handleFileopener" class="absolute block left-[50%] top-[50%] -translate-x-[50%] group-hover:-translate-y-[50%] duration-[300ms] -translate-y-[40%] rounded-full p-1 bg-[#FF9900] aspect-[1/1] h-auto w-auto "><FontAwesomeIcon  class="text-white min-w-[40px] h-auto p-3" :icon="faPenToSquare"></FontAwesomeIcon></button>
      </div>
      
    </div>
  </div>
  <AddProduct :productId="productEditId" @onCloseForm="()=>{toggleAddProduct(null)}" v-if="addProduct"></AddProduct>
    <div v-if=" CompanyDetails" class="flex max-md:overflow-scroll md:grid grid-cols-3 gap-5 w-[min(85%,1000px)] mx-auto mt-10">             
                <ProductsAddCard @click = 'toggleAddProduct'></ProductsAddCard>
                <ProductsCards @onDeleteProduct="handleDeleteProduct" @onEditProduct="toggleAddProduct" :edit='true'  v-for="product in CompanyDetails.products" :Product="product" :key="product.productId"></ProductsCards>
    </div>
  
</template>
