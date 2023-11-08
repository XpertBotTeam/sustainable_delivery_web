<script setup>
import addImage from '../assets/addImage.png'
import { ref,defineProps, onBeforeMount,defineEmits} from "vue";

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

//define toast messages
const toast = useToast();

//define ref variables
const price = ref(null);
const name = ref(null);
let uploadedFile =ref();
const description = ref(null);
const tags = ref([]);

const product = ref(null)



const tagInputRef = ref(null)


//props variables
const props = defineProps(['productId']);


//define emits for events
const emit = defineEmits(['onCloseForm']);


onBeforeMount(()=>{
 if(props.productId){
    fetchData();
 }
})

//fetch data
const fetchData = () => {
  var myHeaders = new Headers();
myHeaders.append("jwt", localStorage.getItem('JWT'));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://localhost:3000/shop/getProductsByCompany?productId=${props.productId}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    product.value = result.products[0]  })
  .catch(error => console.log('error', error));
}

//setting uploadedFile variable
const handelFileChange = (event) => {
  uploadedFile.value = event.target.files[0]
}

//open file uploader
const handleFileOpener = () => {
  const input = document.getElementById('fileInput')
  input.click();

  input.addEventListener('change',(event)=>{
    const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const imgElement = document.getElementById('imgFile');
                imgElement.src = e.target.result;
            }

            reader.readAsDataURL(file);
  })
}

//to handle tags added
const pushTag =() => {
  tags.value.push(tagInputRef.value);
  tagInputRef.value = ''
}


//form submit
const handleSubmit = (event) => {
   
    event.preventDefault();

    const formData = new FormData();

    // Append fields to FormData
    formData.append('name', name.value);
    formData.append('imagePath', uploadedFile.value);
    formData.append('description', description.value);
    formData.append('price', price.value);
    formData.append('tags', tags.value);

    //set headers
    var myHeaders = new Headers();
    myHeaders.append(
      "jwt",
      localStorage.getItem('JWT')
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData, // Pass FormData directly as the body
      redirect: "follow",
    };
    

    fetch(`http://localhost:3000/company/${props.productId !== null ? `editProduct?productId=${props.productId}` : 'addProduct'}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        emit('onCloseForm');
        
          toast.success('added succesfully')
        
          
        
      })
      .catch((error) => {toast.error('make sure to enter unique name for a product in your shop')});
};

</script>
<template>
  <form method="post" @submit="handleSubmit">
    <div
      class="min-w-[40%] z-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[11px] min-h-[300px]"
    >
      <div
        class="w-full h-[50px] rounded-[11px] bg-[#FF9900] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]"
      ></div>

      <div class="text-[#FF9900] MontserratBold w-fit mx-auto text-[24px] py-5">
        Add Product
      </div>
      <div class="px-10 flex items-end gap-5 mb-5">
        <div>
          <div class="DarkerGrotesque text-[18px] mb-[5px]">Add Image</div>
          <input @change="handelFileChange" class="hidden" id="fileInput" type="file" />

          <img
            @click="handleFileOpener"
            id="imgFile"
            class="w-[175px]"
            :src="((product && product.imagePath) ? product.imagePath  : addImage)"
            alt="'Add Product'"
          />
        </div>
        <div>
          <div class="DarkerGrotesque text-[18px] mb-[5px]">Price</div>
          <div class="flex rounded-[12px] bg-[#D9D9D9] pr-3 items-center w-fit">
            <input
              v-model="price"
              name="price"
              class="bg-[transparent] w-[70px] pl-3 w-[100px] rounded-l-[12px] py-1"
              type="number"
              :placeholder="(product && product.price ? product.price : 0 )"
            />$
          </div>
        </div>
      </div>

      <div class="px-10 mb-5">
        <div class="DarkerGrotesque text-[18px] mb-[5px]">Product Name</div>
        <input
          v-model="name"
          name="productName"
          :placeholder="(product && product.name ? product.name : 'product name' )"
          class="rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3"
        />
      </div>

      <div class="px-10 mb-5">
        <div class="DarkerGrotesque text-[18px] mb-[5px]">Description</div>
        <textarea
          v-model="description"
          name="description"
          :placeholder="(product && product.description ? product.description : 'description' )"
          class="rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3 w-full aspect-[5/1]"
        ></textarea>
      </div>

      <div class="px-10 mb-5">
        <div class="DarkerGrotesque text-[18px] mb-[5px]">Tags</div>
        <div class="flex gap-5 mb-5">
          <input
          v-model="tagInputRef"
            placeholder="tag"
            class="rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3 tagInput"
          />
          <div @click="pushTag" class="orderButton">add tag</div>
        </div>
        <div class="flex-wrap flex gap-[8px]">
          <div @click="()=>{tags.value = tags.splice(index,1)}" class="hover:brightness-75 duration-[300ms] hover:cursor-pointer rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3 w-[50px] w-max" v-for='(detail,index) in tags'>{{ detail }}</div>
        </div>
      </div>

      <div class="px-10 w-full h-[1px] bg-[black] mb-5"></div>

      <div class="flex gap-5 w-fit mx-auto mb-5">
        <button
          type="submit"
          class="min-w-[120px] bg-[#F90] text-white text-[16px] rounded-[12px] px-3 py-1 DarkerGrotesque"
        >
          Save Changes
        </button>
        <button
          @click="()=>{emit('onCloseForm')}"
          class="bg-[#F40606] orderButton min-w-[120px] text-[] text-[16px] rounded-[12px] px-3 py-1 DarkerGrotesque"
        >
          Discard
        </button>
      </div>
    </div>
  </form>
</template>
