<script setup>
import { defineProps } from 'vue';

//define props
const props = defineProps(['color'])
console.log(props.color)
</script>
<template>
    <div :style="{ 'background-color': props.color }" :class="`orderButton text-center`"><slot></slot></div>
    
</template>