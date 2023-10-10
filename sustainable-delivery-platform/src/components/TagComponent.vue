<script setup>
import { defineProps } from 'vue';

//define props
const props = defineProps(['status'])

</script>
<template>
    <div :style="{
        'background-color':
            props.status === 'Pending' ? '#FF9900' :
                props.status === 'Preparing' ? '#0AB1BC' :
                    props.status === 'Delivering' ? '#FF2E00' :
                        props.status === 'Delivered' ? '#01AB78' : 
                            props.status === 'Prepared' ? '#01AB78' : ''
    }" :class="`orderButton text-center hover:cursor-pointer`">
        <slot></slot>
    </div>
</template>