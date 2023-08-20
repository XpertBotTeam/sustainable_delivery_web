
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['Type']);

</script>
<template>
    <div class="w-[min(100%,430px)] md:w-[min(80%,500px)] mx-auto rounded-[42px] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]" >
        <div :class="'w-full h-[30px] md:h-[50px] rounded-[11px] shadow-[0_4px_10px_1px_rgba(12,12,12,.37) duration-[500ms] '+ (props.Type === 'Company' ? 'bg-[#FF9900]' : '')+(props.Type === 'DeliveryGuy' ? 'bg-[#01AB78]' : '')+(props.Type === 'User' ? 'bg-[#8C8C8C]' : '')"></div>
        <form>

        <div class="px-5 md:px-10 pb-5 md:pb-10 ">
            <div :class="'MontserratBold text-[24px] md:text-[32px] mx-auto w-fit py-2 md:py-4 duration-[500ms] '+ (props.Type === 'Company' ? 'text-[#FF9900]' : '')+(props.Type === 'DeliveryGuy' ? 'text-[#01AB78]' : '')+(props.Type === 'User' ? 'text-[#8C8C8C]' : '')">SIGN UP</div>

            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">First Name</div>
            <input class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>
            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">Last Name</div>
            <input class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>
            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">Email</div>
            <input class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>
            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">Password</div>
            <input class="w-full h-[25px] md:text-[24px] border-b-2 border-solid border-black mb-2"/>

            <div class="DarkerGrotesque md:text-[14px] text-[12px] text-[#A09F9F] w-fit mx-auto mb-3"><router-link to="/Login">Already a member? <span class="text-[black] text-[16px] md:text-[18px] ml-[10px] DarkerGrotesqueBold">Login</span></router-link></div>

            <button :class="'w-full text-[18px] md:text-[24px] text-white rounded-[12px]  py-2 DarkerGrotesqueBold duration-[500ms] ' + (props.Type === 'Company' ? 'bg-[#FF9900]' : '')+(props.Type === 'DeliveryGuy' ? 'bg-[#01AB78]' : '')+(props.Type === 'User' ? 'bg-[#8C8C8C]' : '') ">Sign Up</button>
        </div>
    </form>

    </div>
</template>