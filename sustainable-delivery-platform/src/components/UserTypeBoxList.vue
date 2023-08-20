<script setup>
import SvgIcon from './SvgIcon.vue';
import UserTypeBox from './UserTypeBox.vue';

import { ref, defineEmits, watch } from 'vue';
const Type = ref('Company');
const emit = defineEmits(['Type']);

watch(Type, (newValue) => {
  emit('Type',newValue)
});

</script>
<template>
    <div class="flex md:flex-col justify-between items-stretch max-md:mt-10  mx-auto max-md:gap-5 gap-10">
        <UserTypeBox :class="'w-[90px] h-[95px] duration-[500ms] '+ (Type==='Company'?'max-md:-translate-y-[20px] md:translate-x-[20px] scale-[110%]':'opacity-[.6]')" @click="()=>{Type='Company'}" :active="Type==='Company'" Type='Company' color="#FF9900">
            <SvgIcon class="w-fit mx-auto" iconName="Company"></SvgIcon>
        </UserTypeBox>
        <UserTypeBox :class="'w-[90px] h-[95px] duration-[500ms] '+ (Type==='DeliveryGuy'?'max-md:-translate-y-[20px] md:translate-x-[20px] scale-[110%]':'opacity-[.6]')" @click="()=>{Type='DeliveryGuy'}" :active="Type==='DeliveryGuy'" Type='DeliveryGuy' color="#01AB78">
            <SvgIcon class="w-fit mx-auto" iconName="DeliveryGuy"></SvgIcon>
        </UserTypeBox>
        <UserTypeBox :class="'w-[90px] h-[95px] duration-[500ms] '+ (Type==='User'?'max-md:-translate-y-[20px] md:translate-x-[20px] scale-[110%]':'opacity-[.6]')" @click="()=>{Type='User'}"  Type='User' color="#8C8C8C">
            <SvgIcon class="w-fit mx-auto" iconName="User"></SvgIcon>
        </UserTypeBox>
    </div>
</template>