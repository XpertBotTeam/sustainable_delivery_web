<script setup>
import { ref, onBeforeMount, watch } from 'vue';

//fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLocationDot, faPenToSquare, faPhone } from "@fortawesome/free-solid-svg-icons";



import { useUserAuth } from "@/utils/useUserAuth";

//get user location
import useGetLocation from '@/utils/useGetLocation';
import MapComponentStatic from './MapComponentStatic.vue';

import addImage from '../assets/addImage.png'

//define ref variables
const user = ref(null);
const userType = ref(null);
const center = ref(null)

//imnput ref variables
const uploadedFile = ref(null)
const nameRef = ref(null)
//const phoneRef = ref(null)

const editMode = ref(false);

//toggle edit mode
const toggleEditMode = () => {
  editMode.value = !editMode.value
}

onBeforeMount(async () => {
  //set user value
  const { user: fetchedUser, userType: fetchedUserType } = await useUserAuth();
  user.value = fetchedUser;
  userType.value = fetchedUserType;
});

//get center location
watch(user, async (newValue) => {
  if (newValue.address && newValue.address.longitude && newValue.address.latitude) {
    //address found from the backend
    center.value = { lng: newValue.address.longitude, lat: newValue.address.latitude }
  } else {
    //address not found from backend so we extract user address
    center.value = await useGetLocation();

  }

})


//change location
const handleLocationChange = (LOCATION) => {
  var myHeaders = new Headers();
  myHeaders.append("jwt", localStorage.getItem('JWT'));
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "location": LOCATION
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/admin/updateLocation", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


//setting uploadedFile variable
const handelFileChange = (event) => {
  uploadedFile.value = event.target.files[0]
}

//open file uploader
const handleFileOpener = () => {
  alert('done')
  const input = document.getElementById('fileInput')
  input.click();

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imgElement = document.getElementById('imgFile');
      imgElement.src = e.target.result;
    }

    reader.readAsDataURL(file);
  })
}

//form submit
const handleSubmit = (event) => {
  event.preventDefault();

  // Append fields to FormData
  var myHeaders = new Headers();
  myHeaders.append("jwt", localStorage.getItem('JWT'));

  const formData = new FormData();

    // Append fields to FormData
    formData.append('name', nameRef.value);
    formData.append('imagePath', uploadedFile.value);
  //formData.append('phoneNumber', '');
  //formData.append('imagePath', uploadedFile.value)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/admin/editUser", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
</script>


<template>
  <div class="w-[70%] mx-auto rounded-[12px] bg-white relative shadow-[0_4px_10px_1px_#0C0C0C5E]">
    <form method="post" @submit="handleSubmit">
      <div class="flex py-10 justify-between pl-14 gap-10">

        <div class="flex-1">
          <div class="flex justify-between items-start mb-5">
            <div class="DarkerGrotesque text-[16px]">
              Update profile picture
            </div>
            <button class="z-[200]" @click='toggleEditMode'>
              <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
            </button>
          </div>

          <img id="imgFile" @click="handleFileOpener" :onerror="(e) => { e.target.src = addImage }"
            :src="(user && user.profileImage) ? user.profileImage : '/src//assets/addImage.png'" alt="add your image" />
          <input @change="handelFileChange" id="fileInput" type="file" class="hidden" />
        </div>
        <div class="flex-1 ">
          <div class="flex justify-between items-center mb-5">
            <div class="DarkerGrotesque text-[16px]">
              Full Name
            </div>
            <div v-if="editMode === false" class="Roboto text-[14px] text-[#929292]">
              {{ (user && user.name) ? user.name : 'name' }}
            </div>
            <input v-model="nameRef" v-if="editMode === true" :placeholder="(user && user.name) ? user.name : 'name'"
              class="Roboto text-[14px] text-[#929292] max-w-fit border border-solid border-[black]">

            <button class="z-[200]" @click='toggleEditMode'>
              <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
            </button>
          </div>

          <div class="flex justify-between items-center mb-5">
            <div class="DarkerGrotesque text-[16px]">
              Email
            </div>
            <div class="Roboto text-[14px] text-[#929292]">
              {{ (user && user.userName) ? user.userName : 'userName' }}
            </div>

          </div>

          <div class="mb-5">
            <div class="flex justify-between items-center mb-[12px]">
              <div class="DarkerGrotesque text-[16px] flex items-center">
                <FontAwesomeIcon class="mr-[10px]" :icon="faLocationDot" />
                <div>Location</div>
              </div>
              <button class="z-[200]" @click='toggleEditMode'>
                <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
              </button>

            </div>
            <MapComponentStatic @onLocationChange="handleLocationChange" v-if="center !== null && center !== undefined"
              class="h-[150px] w-[200px]" :center="center"></MapComponentStatic>

            <div v-if="center" class="Roboto text-[14px] text-[#929292]">
              Select a location to udate your location
            </div>
          </div>




          <div class="">
            <div class="DarkerGrotesque text-[16px] flex items-center">
              <FontAwesomeIcon class="mr-[10px]" :icon="faPhone" />
              <div>Contact Info</div>
            </div>

            <div class="flex justify-between items-center">
              <div class="Roboto text-[14px] text-[#929292]">
                {{ (user && user.phoneNumber) ? user.phoneNumber : 'Enter your Phone Number' }}
              </div>

            </div>
          </div>

        </div>

        <div class=" flex items-center justify-end flex-1 min-w-[45%] -ml-[80px]">
          <img class="w-full translate-x-[80px] w-full h-auto " src="../assets/MotorcycleAll.png" />
        </div>
      </div>
      <div class="translate-y-[50%] gap-10 flex mx-auto w-max">
        <button :class="'min-w-[250px] block orderButton color' + (userType)">Save Changes</button>
        <button :class="'min-w-[250px] block orderButton color' + (userType)">Discard</button>
      </div>
    </form>
  </div>
</template>
