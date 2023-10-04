<script setup>
import { defineProps,ref,onBeforeMount,computed } from "vue";

//import vuex store:
import { useStore } from 'vuex';
const store = useStore();

//define props variables
const props = defineProps(["Product","companyName"]);

const userType = ref(null)
//extract userType
onBeforeMount(()=>{
    const store = useStore();
    userType.value = computed(() => store.state.userType);
    
})

//add to cart funcxtionality
const handleAddToCart = async () => {
  //extract
  const companyId = props.Product.productId.ownerId;
  const productId = props.Product.productId._id;

  try{
  //request headers
  var myHeaders = new Headers();
  myHeaders.append(
    "jwt",
     localStorage.getItem('JWT')
  );

  //request option
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: "",
    redirect: "follow",
  };

  const result = await fetch(
    `http://localhost:3000/user/addToCart?companyId=${companyId}&productId=${productId}`,
     requestOptions
  );
  
  if(!result.ok){
    console.log(result.json());
  }else{
    store.dispatch('addToCart', { companyId, product: {id:productId,price: props.Product.productId.price,name: props.Product.productId.name}, quantity:1 ,companyName: props.companyName});
    alert('added to cart succesfully')
  }
   }catch(err){
     //error handling
     console.log(err)
   }
};
</script>

<template>
  <div
    class="min-w-[290px] w-full rounded-[42px] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5"
  >
    <img
    :onerror="(e)=>{e.target.src='https://commercial.bunn.com/img/image-not-available.png'}"
      class="w-full mb-5  w-full h-[250px] object-contain"
      :src="props.Product.productId.imagePath || 'https://commercial.bunn.com/img/image-not-available.png'"
    />

    <div>
      <div class="mb-5">
        <div class="MontserratBold text-[14px] text-[black]">
          {{ props.Product.productId.name }}
        </div>
        <div class="Roboto text-[12px] text-[#8B8B8B]">
          {{ props.Product.productId.description }}
        </div>
      </div>

      <div class="Roboto text-[14px] mb-[10px]">
        $<b>{{ props.Product.productId.price }}</b>
      </div>
      <button
      v-if="userType.value === 'User'"
        @click.prevent="handleAddToCart"
        class="orderButton"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>
