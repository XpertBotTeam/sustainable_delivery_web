<script setup>
import { ref,defineProps } from 'vue';
//define ref variables
const price = ref(null);
const name = ref(null);
const description = ref(null);
const tags = ref(null);

//props variables
const props = defineProps(['productId']);

tags.value = ''

//handle add and edit product
const handleSubmit = () => {
   alert(price.value)
   if(props.productId !== null){
    alert('')
   }
}
</script>
<template>
    <form @submit = 'handleSubmit'>
    <div class="min-w-[40%] z-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[11px] min-h-[300px]">
            <div class="w-full h-[50px] rounded-[11px] bg-[#FF9900] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]"></div>

            <div class="text-[#FF9900] MontserratBold w-fit mx-auto text-[24px] py-5">Add Product</div>
            <div class="px-10 flex items-end gap-5 mb-5">
                <div>
                    <div class="DarkerGrotesque text-[18px] mb-[5px]">Add Image</div>
                    <img class="w-[175px]" src="../assets//addImage.png" alt="'Add Product'"/>
                </div>
                <div>
                    <div class="DarkerGrotesque text-[18px] mb-[5px]">Price</div>
                    <div class="flex rounded-[12px] bg-[#D9D9D9] pr-3 items-center w-fit "><input v-model='price' name="price" class="bg-[transparent] w-[70px] pl-3 w-[100px] rounded-l-[12px] py-1" type="number" placeholder="0"/>$</div>
                </div>
            </div>

            <div class="px-10 mb-5">
                <div class="DarkerGrotesque text-[18px] mb-[5px]">Product Name</div>
                <input v-model='name' name="productName" placeholder="product name" class=" rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3"/>
            </div>

            <div class="px-10 mb-5">
                <div class="DarkerGrotesque text-[18px] mb-[5px]">Description</div>
                <textarea v-model='description' name="description" placeholder="description" class=" rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3 w-full aspect-[5/1]"></textarea>
            </div>

            <div class="px-10 mb-5">
                <div class="DarkerGrotesque text-[18px] mb-[5px]">Tags</div>
                <div class="flex gap-5 mb-5">
                    <input placeholder="tag" class=" rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3"/>
                    <button class="orderButton">add tag</button>
                </div>
                <div class="flex-wrap flex gap-[8px]"><input placeholder="tag" class=" rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3 w-[50px]"/><input placeholder="tag" class=" rounded-[12px] py-1 px-3 bg-[#D9D9D9] pr-3 w-[50px]"/><input placeholder="tag" class=" rounded-[12px] py-1 px-3 w-[50px] bg-[#D9D9D9] pr-3"/></div>
            </div>

            <div class="px-10 w-full h-[1px] bg-[black] mb-5"></div>

            <div class="flex gap-5 w-fit mx-auto mb-5">
                <button @click.prevent="handleSubmit" class="min-w-[120px] bg-[#F90] text-white text-[16px] rounded-[12px] px-3 py-1 DarkerGrotesque ">Save Changes</button>
                <button class="bg-[#F40606] orderButton min-w-[120px] text-[] text-[16px] rounded-[12px] px-3 py-1 DarkerGrotesque">Discard</button>
            </div>
    </div>
    </form>
</template>