
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['Type']);

</script>
<template>
    <form>
    <div class="max-w-[600px] mx-auto rounded-[42px] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]">
        <div :class="'w-full h-[40px] md:h-[56px] rounded-[11px] shadow-[0_4px_10px_1px_rgba(12,12,12,.37) '+ (props.Type === 'Company' ? 'bg-[#F90]' : '')"></div>

        <div class="px-5 md:px-10 pb-10 md:pb-20 ">
            <div :class="'MontserratBold text-[24px] md:text-[32px] mx-auto w-fit py-5 md:py-10 '+(props.Type === 'Company' ?'text-[#F90]' :'')">SIGN UP</div>

            <div class="text-[18px] md:text-[24px] text-[black] ">First Name</div>
            <input class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>
            <div class="text-[18px] md:text-[24px] text-[black]">Last Name</div>
            <input class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>
            <div class="text-[18px] md:text-[24px] text-[black]">Email</div>
            <input class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>
            <div class="text-[18px] md:text-[24px] text-[black]">Password</div>
            <input class="w-full h-[25px] md:text-[24px] border-b-2 border-solid border-black mb-5 md:mb-10"/>

            <button :class="'w-full text-[18px] md:text-[24px] text-white rounded-[12px]  py-2 DarkerGrotesque ' + (props.Type==='Company' ? 'bg-[#F90]' :'')">Sign Up</button>
        </div>

    </div>
</form>
</template>