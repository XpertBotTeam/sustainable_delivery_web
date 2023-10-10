<script setup>
//importing  navbar
import NavBar from '@/components/NavBars/NavBar.vue';

//import vue js functionality methods
import { onBeforeMount,ref, watch} from 'vue';

//fot auth check
import { useStore } from 'vuex';
import { useUserAuth } from '@/utils/useUserAuth';
import OrderStatusCard from '@/components/OrderStatusCard.vue';

import TagComponent from '@/components/TagComponent.vue';

//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner,faBars } from '@fortawesome/free-solid-svg-icons';

import DeliveryGuyNotification from '../components/DeliveryGuyNotification.vue'

//define ref variables
const deliveryOrders = ref({item:''});
const deliveryStatus = ref(null)

let loading = ref(false);


const status = ref(['Pending','Preparing','Prepared','Delivering','Delivered']);


//set filter tags
const filterTags = (tag) => {
  if(tag){
    deliveryStatus.value = tag;
  }
};


watch(deliveryStatus,(newTags)=>{
  fetchData();
  console.log(newTags)
},{deep:true})

onBeforeMount(async()=>{
  //define store
  const store = useStore();

//auth check and set store variables
  const {userType,authorized} = await useUserAuth()
  store.dispatch('setAuth', {authorized,userType});

  //fetch data
  fetchData();
})

watch(deliveryOrders , async (oldValue,newValue) =>{ 
  console.log("old:"+JSON.stringify(oldValue) + "       new:"+JSON.stringify(newValue));
},{deep:true})
//fetching delivery guy orders
const fetchData = async () => {
  loading = true;
  //define headers
  var myHeaders = new Headers();
  myHeaders.append("jwt", localStorage.getItem('JWT'));


var requestOptions = {
  method: 'GET',
  headers: myHeaders,

  redirect: 'follow'
};

fetch(`http://localhost:3000/deliveryGuy/MyOrders?${deliveryStatus.value ? `status=${deliveryStatus.value}`: ''}`, requestOptions)
  .then(response => response.json())
  .then(result => {deliveryOrders.value = result.orders;loading = false})
  .catch(error => console.log('error', error));
}

</script>
<template>
    <div class="bg-gradient-to-b from-[#F7F7F7] to-[#D5D4D433]">
        <NavBar class="mb-10"></NavBar>
        <div class="flex justify-between w-[min(85%,1000px)] mx-auto mb-5">
        <div class="flex   gap-5">
          <TagComponent @click="filterTags(tag)" class="w-fit" :status="tag" v-for="tag in status" :key="tag">{{ tag }}</TagComponent>
      </div>

      <DeliveryGuyNotification v-if="loading"></DeliveryGuyNotification>
      
      <div class="h-full">
      <FontAwesomeIcon class="min-w-[20px] h-auto" :icon="faBars"></FontAwesomeIcon>
    </div>
    </div>
      <div v-if="loading === true" class="w-fit mx-auto animate-spin"><FontAwesomeIcon class="text-[32px] text-[#D9D9D9]" :icon="faSpinner"></FontAwesomeIcon></div>

        <div class="flex flex-col w-full gap-10">
            <OrderStatusCard v-for="order in deliveryOrders" :order="order" :key="order._id"></OrderStatusCard>
        </div>
    </div>
</template>