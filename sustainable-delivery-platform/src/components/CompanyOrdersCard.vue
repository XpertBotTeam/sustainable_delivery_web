<script setup>
    import { defineProps } from 'vue';

    //define props
    const props = defineProps(['order'])


    import TagComponent from './TagComponent.vue';
</script>
<template>
    <div class="bg-white rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]">
        <div class="flex justify-between gap-5">
        <div class="min-h-full flex flex-col justify-between flex-1">
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Client Name</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{ props.order.user.name }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Address</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{ `${props.order.user.address.country} / ${props.order.user.address.city}`  || useParseAddress({longitude:props.order.userId.address.longitude||null,latitude:props.order.userId.address.longitude||null}) }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Order Date</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{new Date(props.order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Price</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{props.order.total}}$</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Delivery Guy</div>
                <div class="Roboto text-[18px] text-[#D9D9D9]">{{props.order.deliveryGuy.name}}/ {{props.order.deliveryGuy.userName}}</div>
            </div>
            <TagComponent :status='props.order.companyOrders[0].status' class="w-[200px] mt-5">{{ props.order.companyOrders[0].status }}</TagComponent>
        </div>
        hello
       </div>
    </div>
</template>