<script setup>
import { defineProps } from 'vue';
const props = defineProps(['color','Type','active']);
</script>
<template>
    <div :class="'rounded-[22px] shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] flex flex-col justify-between bg-white relative duration-[500ms]'">
        <slot></slot>
        <div :class="' rounded-[9px] w-full DarkerGrotesque bg-[' + (props.color) +'] h-[25px] flex items-center absolute bottom-0'">
            <div class="w-fit mx-auto">{{ props.Type }}</div>
        </div>
    </div>
</template>