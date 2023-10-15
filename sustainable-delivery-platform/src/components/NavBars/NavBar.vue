<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import Logo from '../../assets/Logo.png'
import DropdownList from '../DropdownList.vue';

import { useStore } from 'vuex';



const userType = ref(null)
const user = ref(null)
//extract userType
onBeforeMount(() => {
    const store = useStore();
    userType.value = computed(() => store.state.userType);
    user.value = computed(() => store.state.user);

})


console.log(user.value)
</script>

<template>
    <nav :class="`${userType.value ? `color${userType.value}` : 'bg-[black]'} w-full  shadow-[0_4px_84px_0px_black] relative`">
        <div class="flex w-[85%] mx-auto items-center justify-between ">
            <div v-if=" user.value && user.value.name" class="flex gap-5">
                <img class="rounded-full border border-solid border-[black] max-w-[45px] aspect-[1/1] h-auto " @error="(e)=>{e.target.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAMFBMVEXk5ueutLeqsLTq6+yyuLvAxcfT1tjY29y4vcDg4uPO0dPKztC8wcTn6end3+HQ1NXO0aCsAAAC2ElEQVR4nO2ayXbrIAxAGQ0YZP//39ZDkqYZsORI5Lx3uJssutCtEJOwUp1Op9PpdDqdTqfzXwLw97d5+JB9XCl+Ts0lAIaijb5ijPbBtoyvsr6Lf7FwQ7tEjO4x/E4MTRRAxdfx1zzkBgoQ3sZfFaK8wFiJv1XDJJuGI4GVJCow1IaggUK9Bm4I1kJyGAGtvVQpgMcJaDMIKaCKYEfGwKLjay2yMsGIT4HQfECW4YbE8oyciVccu4CCQhFYpgO7AXYtuFLYDyyEqbjDLYBejW4EZgNLHARtRu7ZQE0B++YwkQ0icykGsoFmNhjIAobZYP4XDZgr8fs5+H4d0OeCYzZIZAPu9eD7a6KNVIOZV0BBpu7OE7OBoh3SlkLkPygSt2f+exPxiGK4DygLE2kYRG6vlMOyzM2RkgSB68KCxSfBCDXV8Cc19hX5AnpVMuyr0U3BoxTMLNhOwyxLsm1NxCZtxLpIO4fVaKSq8MbBHdr4Bk3+UitH9tviK953dsWbyjeF5M2LPBidm4TfsMk/vrEYN6qmb02ghuK0uaCjD23jbw6QpjDmhTlM7cOvAmB/gaavfWCX/37OvkTntjFwLha/ZCItf5GPrlLIZa/8x5mwEPMgOiCgQo7u1US8F9mKUqSxbYN/88z4bOH5Hz/tlJ/yXpUwJTAWxZJ9WlN5l4gzV0lAeP/IeujAgJ2qe+GBgxs+3azXTeh0/N3hs4M70NtHz+RPyuHDBOyY0x8FAL2X/M5hPFUNMHMk4KJQzhiQ2zZV6Ld55PUID/U2bbkFqArsGaAq0Ft3KPC1gPvSgg7+PpVkBPDdJSA3cPEKqCd5oSLYDVArE72PT1FAjIMlP++SQExJtu3oNcePwcIp0IiHULky3Dn6NALz3dmHlINhOHEsJ2K+PAhHE5L4wc05qv1GyPIC9S2S/rXJCVx1c5DblO6oGSRnGlB9BLvvDYlRE+h0Op3Od/kBmOwiVrAapnoAAAAASUVORK5CYII='}" :src="user.profileImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAMFBMVEXk5ueutLeqsLTq6+yyuLvAxcfT1tjY29y4vcDg4uPO0dPKztC8wcTn6end3+HQ1NXO0aCsAAAC2ElEQVR4nO2ayXbrIAxAGQ0YZP//39ZDkqYZsORI5Lx3uJssutCtEJOwUp1Op9PpdDqdTqfzXwLw97d5+JB9XCl+Ts0lAIaijb5ijPbBtoyvsr6Lf7FwQ7tEjO4x/E4MTRRAxdfx1zzkBgoQ3sZfFaK8wFiJv1XDJJuGI4GVJCow1IaggUK9Bm4I1kJyGAGtvVQpgMcJaDMIKaCKYEfGwKLjay2yMsGIT4HQfECW4YbE8oyciVccu4CCQhFYpgO7AXYtuFLYDyyEqbjDLYBejW4EZgNLHARtRu7ZQE0B++YwkQ0icykGsoFmNhjIAobZYP4XDZgr8fs5+H4d0OeCYzZIZAPu9eD7a6KNVIOZV0BBpu7OE7OBoh3SlkLkPygSt2f+exPxiGK4DygLE2kYRG6vlMOyzM2RkgSB68KCxSfBCDXV8Cc19hX5AnpVMuyr0U3BoxTMLNhOwyxLsm1NxCZtxLpIO4fVaKSq8MbBHdr4Bk3+UitH9tviK953dsWbyjeF5M2LPBidm4TfsMk/vrEYN6qmb02ghuK0uaCjD23jbw6QpjDmhTlM7cOvAmB/gaavfWCX/37OvkTntjFwLha/ZCItf5GPrlLIZa/8x5mwEPMgOiCgQo7u1US8F9mKUqSxbYN/88z4bOH5Hz/tlJ/yXpUwJTAWxZJ9WlN5l4gzV0lAeP/IeujAgJ2qe+GBgxs+3azXTeh0/N3hs4M70NtHz+RPyuHDBOyY0x8FAL2X/M5hPFUNMHMk4KJQzhiQ2zZV6Ld55PUID/U2bbkFqArsGaAq0Ft3KPC1gPvSgg7+PpVkBPDdJSA3cPEKqCd5oSLYDVArE72PT1FAjIMlP++SQExJtu3oNcePwcIp0IiHULky3Dn6NALz3dmHlINhOHEsJ2K+PAhHE5L4wc05qv1GyPIC9S2S/rXJCVx1c5DblO6oGSRnGlB9BLvvDYlRE+h0Op3Od/kBmOwiVrAapnoAAAAASUVORK5CYII='" alt="profile"/>
                <div>
                    <div class="text-[white] DarkerGrotesque text-[18px]">{{ user.value.name }}</div>
                    <div class="text-[#A1A1A1] DarkerGrotesque text-[14px]">{{ user.value.userName }}</div>
                </div>
            </div>
          
            <img class="max-w-[80px] md:max-w-[115px]" :src="Logo" alt="logo" />
            <div>

                <div class="text-white flex gap-5 md:gap-10 max-md:hidden">
                    <div class="MontserratBold md:text-[18px] text-[16px]">
                        <router-link to="/">logout</router-link>
                    </div>
                    <div v-if="userType.value === 'User'" class="MontserratBold md:text-[18px] text-[16px]">
                        <router-link to="/home">Home</router-link>
                    </div>
                    <div v-if="userType.value === 'Company'" class="MontserratBold md:text-[18px] text-[16px]">
                        <router-link to="/company">Home</router-link>
                    </div>
                    

                    <div  class="MontserratBold md:text-[18px] text-[16px]">
                        <router-link to="/profile">My Profile</router-link>
                    </div>

                    
                    
                    <div v-if="userType.value === 'User'" class="MontserratBold md:text-[18px] text-[16px]">
                        <router-link to="/user/orders">My Orders</router-link>
                    </div>

                    <div v-if="userType.value === 'Company'" class="MontserratBold md:text-[18px] text-[16px]">
                        <router-link to="/company/orders">My Orders</router-link>
                    </div>

                    <div v-if="userType.value === 'DeliveryGuy'" class="MontserratBold md:text-[18px] text-[16px]">
                        <router-link to="/deliveryGuy">My Orders</router-link>
                    </div>
                    
                </div>
                <dropdown-list></dropdown-list>
            </div>
            </div>
    </nav>
</template>