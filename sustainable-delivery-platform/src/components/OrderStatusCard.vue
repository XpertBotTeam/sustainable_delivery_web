<script setup>
import MapComponent from './MapComponent.vue';
import TagComponent from './TagComponent.vue';

//define props variables
import { defineProps  } from 'vue';
const props = defineProps(['order']);


import useParseAddress from '../utils/useParseAddress'



</script>
<template>
    <div class="w-[min(85%,1000px)] mx-auto rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] bg-white p-5 gap-5">
       <div class="flex justify-between gap-5">
        <div class="min-h-full flex flex-col justify-between flex-1">
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Client Name</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{ props.order.userId.name }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Address</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{ `${props.order.userId.address.country} / ${props.order.userId.address.city}`  || useParseAddress({longitude:props.order.userId.address.longitude||null,latitude:props.order.userId.address.longitude||null}) }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Order Date</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{new Date(props.order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Price</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{props.order.total}}$</div>
            </div>
            <TagComponent :status='props.order.status' class="w-full mt-5">{{ props.order.status }}</TagComponent>
        </div>
        <MapComponent class="min-h-[190px] min-w-[240px] rounded-[20px]"></MapComponent>
       </div>
    </div>
</template>