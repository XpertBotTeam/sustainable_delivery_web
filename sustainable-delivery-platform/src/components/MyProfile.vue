<script setup>
import { ref, onBeforeMount, watch } from 'vue';

//fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLocationDot, faPenToSquare, faPhone } from "@fortawesome/free-solid-svg-icons";


import MapComponent from "./MapComponent.vue";
import { useUserAuth } from "@/utils/useUserAuth";

//get user location
import useGetLocation from '@/utils/useGetLocation';

//define ref variables
const user = ref(null);
const userType = ref(null);
const center = ref(null)

onBeforeMount(async () => {
  //set user value
  const { user: fetchedUser, userType: fetchedUserType } = await useUserAuth();
  user.value = fetchedUser;
  userType.value = fetchedUserType;
});

//get center location
watch(user,async(newValue)=> {
  if(newValue.address && newValue.address.longitude && newValue.address.latitude){
    //address found from the backend
    alert('founded: '+JSON.stringify({lng:newValue.address.longitude,lat:newValue.address.latitude}))
    center.value = {lng:newValue.address.longitude,lat:newValue.address.latitude}
  }else{
    //address not found from backend so we extract user address
    center.value =  await useGetLocation();
    alert('not found '+JSON.stringify(await useGetLocation()))
  }

})
</script>


<template>
  
  <div
    class="w-[70%] mx-auto rounded-[12px] bg-white relative shadow-[0_4px_10px_1px_#0C0C0C5E]"
  >
    <div class="flex py-10 justify-between pl-14 gap-10">
      
      <div class="flex-1">
      <div class="flex justify-between items-start mb-5">
        <div class="DarkerGrotesque text-[16px]">
          Update profile picture
        </div>
        <button>
          <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
        </button>
      </div>

      <img :onerror="(e)=>{e.target.src='../assets/addImage.png'}" :src="(user&&user.bannerImage)?user.bannerImage:'/src//assets/addImage.png'" alt="add your image"/>
    </div>
    <div class="flex-1 ">
      <div class="flex justify-between items-center mb-5">
        <div class="DarkerGrotesque text-[16px]">
          Full Name
        </div>
        <div class="Roboto text-[14px] text-[#929292]">
          {{ (user && user.name)?user.name:'name' }}
        </div>
        <button>
          <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
        </button>
      </div>

      <div class="flex justify-between items-center mb-5">
        <div class="DarkerGrotesque text-[16px]">
          Email
        </div>
        <div class="Roboto text-[14px] text-[#929292]">
          {{ (user && user.userName)?user.userName:'userName' }}
        </div>
        
      </div>
      
<div class="mb-5">
      <div class="flex justify-between items-center mb-[12px]">
        <div class="DarkerGrotesque text-[16px] flex items-center">
          <FontAwesomeIcon class="mr-[10px]" :icon="faLocationDot"/>
          <div>Location</div>
        </div>
        <button>
          <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
        </button>
        
      </div>
      <MapComponent v-if="center" class="h-[150px] w-[200px]" :center="center"></MapComponent>
    </div>

      


      <div class="">
        <div class="DarkerGrotesque text-[16px] flex items-center">
          <FontAwesomeIcon class="mr-[10px]" :icon="faPhone"/>
          <div>Contact Info</div>
        </div>

        <div class="flex justify-between items-center">
        <div class="Roboto text-[14px] text-[#929292]">
          {{ (user && user.userName)?user.userName:'userName' }}
        </div>
        <button>
          <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
        </button>
        
      </div>
      </div>

    </div>
        
      <div class=" flex items-center justify-end flex-1 min-w-[45%] -ml-[80px]" >
        <img
          class="w-full translate-x-[80px] w-full h-auto "
          src="../assets/MotorcycleAll.png"
        />
      </div>
    </div>
    <div class="translate-y-[50%] gap-10 flex mx-auto w-max">
      <button :class="'min-w-[250px] block orderButton color'+(userType)">Save Changes</button>
      <button :class="'min-w-[250px] block orderButton color'+(userType)">Discard</button>
    </div>
  </div>
</template>
