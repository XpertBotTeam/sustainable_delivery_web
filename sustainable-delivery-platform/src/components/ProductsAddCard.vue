<script setup>
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


</script>

<template>
    <div class="min-w-[290px] w-full rounded-[42px] hover:bg-[#D9D9D9] group duration-[300ms] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] p-5">
        <div class="w-full h-[250px] mb-5 flex items-center justify-center">
        <FontAwesomeIcon :icon="faPlus" class="text-[#D9D9D9] duration-[300ms] group-hover:text-white w-[80px] h-auto" />
    </div>

        <div>
            <div class="">
                <div class="MontserratBold text-[14px] text-[black] w-fit mx-auto">
                    Add A New Product
                </div>
            </div>
        </div>

    </div>
</template>
