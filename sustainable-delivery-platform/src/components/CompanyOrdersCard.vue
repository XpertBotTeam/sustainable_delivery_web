<script setup>
    import { defineProps ,onBeforeMount,ref} from 'vue';
    import { useRouter } from 'vue-router';

    import useParseAddress from '@/utils/useParseAddress';
    //package image
    import packageImage from '../assets/Package.png'
    //define props
    const props = defineProps(['order','status'])



    //define router
    const router = useRouter();

    const address = ref(null)
    onBeforeMount(async ()=>{
        address.value = await useParseAddress({longitude:props.order.user.address.longitude? props.order.user.address.longitude :null,latitude:props.order.user.address.latitude? props.order.user.address.latitude : null})
    })

    import TagComponent from './TagComponent.vue';
</script>
<template>
    <div v-if="props.status === null || (props.status ===props.order.companyOrders[0].status)" @click="()=>{router.push(`/company/orders/${order.orderId}`)}"  class="bg-white rounded-[42px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5 hover:bg-[#D9D9D9] duration-[300ms] group">
        <div class="flex justify-between gap-5 items-center">
        <div class="min-h-full flex flex-col justify-between flex-1">
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Client Name</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{ (props.order.user && props.order.user.name)?props.order.user.name:'name' }}</div>
            </div>
            <div class="flex gap-5 items-center">
                <div class="DarkerGrotesque text-[24px]">Address</div>
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{ address}}</div>
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
                <div class="Roboto text-[18px] text-[#D9D9D9] group-hover:text-white duration-[300ms] cursor-pointer">{{(props.order && props.order.deliveryGuy && props.order.deliveryGuy.name) ? `${props.order.deliveryGuy.name} / ${props.order.deliveryGuy.userName}` : 'unassigned' }}</div>
            </div>
            <TagComponent :status='props.order.companyOrders[0].status' class="w-[200px] mt-5">{{ props.order.companyOrders[0].status }}</TagComponent>
        </div>
        <img class="max-w-[176px] h-fit" :src="packageImage" />
       </div>
    </div>
</template>