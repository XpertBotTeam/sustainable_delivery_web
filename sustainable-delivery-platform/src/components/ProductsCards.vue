<script setup>
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineProps,ref,onBeforeMount,computed,defineEmits } from "vue";
import { useToast } from "vue-toast-notification";

//import vuex store:
import { useStore } from 'vuex';
const store = useStore();

//define props variables
const props = defineProps(["Product","companyName","edit"]);

const toast = useToast();

//define emits events
const emit = defineEmits(['onEditProduct','onDeleteProduct']);

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
    toast.success('added to cart succesfully')
  }
   }catch(err){
     //error handling
     console.log(err)
   }
};
</script>

<template>
  <div
    :class="`min-w-[290px] w-full relative rounded-[42px] group ${props.edit?'hover:bg-[#D9D9D9]' : ' bg-[white]'} duration-[300ms] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5`"
  >
    <img
  :onerror="(e)=>{e.target.src='https://commercial.bunn.com/img/image-not-available.png'}"
      :class="`w-full mb-5  w-full h-[250px] object-contain ${props.edit? 'group-hover:blur-[8px]' : ''}`"
      :src="(props.Product && props.Product.productId && props.Product.productId.imagePath) ?  props.Product.productId.imagePath: 'https://commercial.bunn.com/img/image-not-available.png'"
    />

    <div :class="`${props.edit? 'group-hover:blur-[8px]' : ''}`">
      <div :class="`mb-5 `">
        <div class="MontserratBold text-[14px] text-[black]">
          {{ (props.Product && props.Product.productId && props.Product.productId.name) ? props.Product.productId.name:'name' }}
        </div>
        <div class="Roboto text-[12px] text-[#8B8B8B]">
          {{ (props.Product && props.Product.productId && props.Product.productId.description) ? props.Product.productId.description:'description' }}
        </div>
      </div>

      <div class="Roboto text-[14px] mb-[10px]">
        $<b>{{(props.Product && props.Product.productId && props.Product.productId.price) ? props.Product.productId.price:'0'  }}</b>
      </div>
      <button
      v-if="userType.value === 'User'"
        @click.prevent="handleAddToCart"
        class="orderButton"
      >
        Add to cart
      </button>
    </div>

    <div v-if="props.edit" class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex  items-center gap-[10px]  group-hover:opacity-[100%] opacity-0 duration-[300ms]  group-hover:-translate-y-[10px]">
      <button class="rounded-full p-1 bg-[#FF9900] aspect-[1/1] h-auto w-auto"><FontAwesomeIcon @click="()=>{emit('onEditProduct', props.Product.productId._id)}" class="text-white min-w-[30px]" :icon="faPenToSquare"></FontAwesomeIcon></button>
      <button class="rounded-full p-1 bg-[#FF9900] aspect-[1/1] h-auto w-auto "><FontAwesomeIcon @click="()=>{emit('onDeleteProduct', props.Product.productId._id)}" class="text-white min-w-[30px]" :icon="faTrash"></FontAwesomeIcon></button>
    </div>
  </div>
</template>
