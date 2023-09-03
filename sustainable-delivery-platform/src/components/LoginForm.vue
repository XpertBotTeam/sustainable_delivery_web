
<script setup>

</script>
<template>
    <div class="w-[min(100%,430px)] md:w-[min(80%,500px)] mx-auto rounded-[42px] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] bg-white z-10 md:h-[566px]  relative" >
        <div :class="'w-full h-[30px] md:h-[50px] rounded-[11px] shadow-[0_4px_10px_1px_rgba(12,12,12,.37) duration-[500ms] '"></div>
        <form action="http://localhost:3000/auth/login">

        <div class="px-5 md:px-10 pb-14 md:pb-10 ">
            <div :class="'MontserratBold text-[24px] md:text-[32px] mx-auto w-fit py-2 md:pt-4 md:pb-10 duration-[500ms] '">Login</div>

            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">Username</div>
            <input name="username" class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>
            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">Password</div>
            <input name="password" class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>

            <div class="DarkerGrotesque md:text-[14px] text-[12px] text-[#A09F9F] w-fit ml-auto mb-10 md:mb-20">Forget Password?</div>

            <button :class="'w-full text-[18px] md:text-[24px] text-white rounded-[12px]  pt-2 pb-2 DarkerGrotesqueBold duration-[500ms] bg-[black]' ">Login</button>
        </div>
    </form>

    </div>
</template>
