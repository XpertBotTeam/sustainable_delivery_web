<script setup>
import { defineProps,onBeforeMount,ref } from 'vue';
//import { useRouter } from 'vue-router';

import MapComponent from './MapComponent.vue';

import TagComponent from './TagComponent.vue';

import useParseAddress from '@/utils/useParseAddress';
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import OrderProduct from './OrderProduct.vue';
//define props
const props = defineProps(['order','status'])

//define ref variables
const showMore = ref(false);

import productImage from '../assets/Package.png'

//define router
//const router = useRouter();

const toggleShowMore = () => {
    showMore.value = !showMore.value
}

const address = ref(null)
    onBeforeMount(async ()=>{
        address.value = await useParseAddress({longitude:props.order.userId.address.longitude? props.order.userId.address.longitude :null,latitude:props.order.userId.address.latitude? props.order.userId.address.latitude : null})
    })
</script>
<template>
    <div
     v-if="props.status === null || (props.status === props.order.status)" 
        class="bg-white mb-5 rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5 hover:bg-[#f1f1f1] duration-[300ms] group">
        <div class="flex justify-between gap-5 items-center mb-5">
            <div class="min-h-full flex flex-col justify-between flex-1">
                <div class="flex gap-5 items-center">
                    <div class="DarkerGrotesque text-[24px]">Client Name</div>
                    <div class="Roboto text-[18px] text-[#8B8B8B]  duration-[300ms] cursor-pointer">{{
                        props.order.userId.name }}</div>
                </div>
                <div class="flex gap-5 items-center">
                    <div class="DarkerGrotesque text-[24px]">Address</div>
                    <div class="Roboto text-[18px] text-[#8B8B8B]  duration-[300ms] cursor-pointer">{{
                       
                        address
                    }}</div>
                </div>
                <div class="flex gap-5 items-center">
                    <div class="DarkerGrotesque text-[24px]">Order Date</div>
                    <div class="Roboto text-[18px] text-[#8B8B8B]  duration-[300ms] cursor-pointer">
                        {{ new Date(props.order.orderDate).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day:
                                'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'
                        }) }}</div>
                </div>
                <div class="flex gap-5 items-center">
                    <div class="DarkerGrotesque text-[24px]">Price</div>
                    <div class="Roboto text-[18px] text-[#8B8B8B]  duration-[300ms] cursor-pointer">
                        {{ props.order.total }}$</div>
                </div>
                <div class="flex gap-5 items-center">
                    <div class="DarkerGrotesque text-[24px]">Delivery Guy</div>
                    <div class="Roboto text-[18px] text-[#8B8B8B]  duration-[300ms] cursor-pointer">{{
    (props.order && props.order.deliveryGuyId && props.order.deliveryGuyId.name) ?
                        `${props.order.deliveryGuyId.name} / ${props.order.deliveryGuyId.userName}` : 'not identified' }}
                    </div>
            </div>
            <TagComponent :status='props.order.status' class="w-[200px] mt-5">{{ props.order.status }}</TagComponent>
        </div>
        <div class="flex flex-col items-end gap-5">
            <FontAwesomeIcon @click ='toggleShowMore' :class="`text-[#8B8B8B]  duration-[300ms] ml-auto ${showMore? 'rotate-90' : ''}`"
                :icon='faChevronRight'></FontAwesomeIcon>
            <MapComponent v-if="props.order.status === 'Delivering'" :class="`min-w-[240px] rounded-[20px] min-h-[190px] `" :center="{lng:0,lat:0}"></MapComponent>
            <img class="max-w-[176px]" :src="productImage" v-if="props.order.status !== 'Delivering'"/>
        </div>
    </div>

    <div v-if="showMore" class=" flex flex-col gap-5">
        <div :key="order._id" v-for="order in props.order.companyOrders">
           <div class="DarkerGrotesque text-[24px] mb-5"> {{ order.companyId.name }}</div>
        <OrderProduct :item="item" v-for="item in order.items" :key="item._id"></OrderProduct>
    </div>
    </div>
</div></template>