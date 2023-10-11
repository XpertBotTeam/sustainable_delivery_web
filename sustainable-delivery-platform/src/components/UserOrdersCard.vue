<script setup>
    import { defineProps } from 'vue';
    import { useRouter } from 'vue-router';

    import MapComponent from './MapComponent.vue';
    //define props
    const props = defineProps(['order'])

    //define router
    const router = useRouter();


    import TagComponent from './TagComponent.vue';
</script>
<template>
    <div @click="()=>{router.push(`/company/orders/${order.orderId}`)}"  class="bg-white mb-5 rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5 hover:bg-[#D9D9D9] duration-[300ms] group">
        <div class="flex justify-between gap-5 items-center">
        <div class="min-h-full flex flex-col justify-between flex-1">
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Client Name</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{ props.order.userId.name }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Address</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{ `${props.order.userId.address.country} / ${props.order.userId.address.city}`  || useParseAddress({longitude:props.order.userId.address.longitude||null,latitude:props.order.userId.address.longitude||null}) }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Order Date</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{new Date(props.order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Price</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{props.order.total}}$</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Delivery Guy</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{ (props.order && props.order.deliveryGuyId && props.order.deliveryGuyId.name) ? `${props.order.deliveryGuyId.name} / ${props.order.deliveryGuyId.userName}` : 'not identified' }}</div>
            </div>
            <TagComponent :status='props.order.status' class="w-[200px] mt-5">{{ props.order.status }}</TagComponent>
        </div>
        <MapComponent class="min-w-[240px] rounded-[20px] min-h-[190px]" :center="{lng:0,lat:0}"></MapComponent>
       </div>
    </div>
</template>