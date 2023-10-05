<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { defineProps } from 'vue';
const props = defineProps(['product'])

</script>
<template>
        <div class="px-5 flex items-center justify-between py-3 border-b border-dashed border-[#7D7777] ">
            <div class="DarkerGrotesque text-[18px]">{{props.product.name}}</div>
            <div class="flex items-center gap-5">
                <button class="text-white bg-[black] text-[12px] rounded-[6px] w-[28px] h-[22px] flex items-center justify-center  DarkerGrotesque"><FontAwesomeIcon :icon="faMinus" /></button>
                <div>{{props.product.quantity}}</div>
                <button class="text-white bg-[black] text-[12px] rounded-[6px] w-[28px] h-[22px] flex items-center justify-center   DarkerGrotesque"><FontAwesomeIcon :icon="faPlus"></FontAwesomeIcon></button>
                <button><FontAwesomeIcon :icon='faTrash'></FontAwesomeIcon></button>
            </div>
        </div>
</template>