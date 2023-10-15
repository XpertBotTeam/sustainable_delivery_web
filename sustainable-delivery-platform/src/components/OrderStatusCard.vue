<script setup>
import MapComponent from './MapComponent.vue';
import TagComponent from './TagComponent.vue';

//define props variables
import { defineProps, onBeforeMount,ref,defineEmits  } from 'vue';

//define props
const props = defineProps(['order','type','center']);

//define emits
const emit = defineEmits(['acceptOrder','rejectOrder'])


import useParseAddress from '../utils/useParseAddress'

import productImage from '../assets/Package.png'
import useGetLocation from '@/utils/useGetLocation';
import MapComponentStatic from './MapComponentStatic.vue';


const location = ref(null)
onBeforeMount(async ()=>{
    location.value = await useGetLocation()
})

</script>
<template>
    <div class="w-[min(85%,1000px)] mx-auto rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] bg-white p-5 gap-5">
       <div class="flex justify-between gap-5">
        <div class="min-h-full flex flex-col justify-between flex-1">
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Client Name</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{ (props.order && props.order.userId&& props.order.userId.name) ? props.order.userId.name : '' }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Address</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{  useParseAddress({longitude:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.longitude)?props.order.userId.address.longitude : 0,latitude:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.latitude)?props.order.userId.address.latitude : 0}) }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Order Date</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{new Date(props.order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Price</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{props.order.total}}$</div>
            </div>
            <TagComponent v-if="props.type !== 'notification'"  :status='props.order.status' class="w-full mt-5">{{ props.order.status }}</TagComponent>
        </div>
        <div>
            <MapComponentStatic v-if="props.type === 'notification' && (props.order&&props.order.userId&&props.order.userId.address)     "  :center="props.type === 'notification'? {lng:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.longitude)?props.order.userId.address.longitude: null,lat:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.latitude)?props.order.userId.address.latitude : null } :location" :destination="{lng:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.longitude)?props.order.userId.address.longitude: null,lat:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.latitude)?props.order.userId.address.latitude : null}    " class="min-h-[190px] min-w-[240px] rounded-[20px]"></MapComponentStatic>

        <MapComponent v-if="props.type !== 'notification' && (props.order.status !== 'Delivered' && location)     "  :center="props.type === 'notification'? {lng:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.longitude)?props.order.userId.address.longitude: null,lat:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.latitude)?props.order.userId.address.latitude : null } :location" :destination="{lng:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.longitude)?props.order.userId.address.longitude: null,lat:(props.order&&props.order.userId&&props.order.userId.address&&props.order.userId.address.latitude)?props.order.userId.address.latitude : null}    " class="min-h-[190px] min-w-[240px] rounded-[20px]"></MapComponent>
        
        </div>

        
        <img  v-if="props.order.status === 'Delivered'" class="max-w-[176px]" :src="productImage"/>
       </div>
       <div class="mt-5 gap-5 flex ml-auto w-full" v-if="props.type==='notification'">
            <button @click="()=>{emit('acceptOrder',props.order._id)}" style="background-color: #01AB78;" class=" orderButton flex-1 ">accept</button>
            <button @click="()=>{emit('rejectOrder',props.order._id)}" class=" orderButton flex-1 ">reject</button>
        </div>
    </div>
</template>