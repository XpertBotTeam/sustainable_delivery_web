
<script setup>
//vue router
import { useRouter } from 'vue-router';

//define router
const router = useRouter();

//ref variables
import { ref } from 'vue';

//define ref variables
const userNameRef = ref('');
const passwordRef = ref('');

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast()

const handleSubmit = async () => {
    //define request headers
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3AHh8SsKQH6uiDBWrJjgT4Wr3h5ppXmoZi.gpnt36jEelbLzfdvVKhOPBHZfp8oPnJ3MO1NioKMp1M");

    //define request body
    var raw = JSON.stringify({
    "userName": userNameRef.value,
    "password": passwordRef.value
    });

    //request options
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`http://localhost:3000/auth/login`, requestOptions)
    .then(response => {
        if (!response.ok) {
            if (response.status === 500) {
                // server error
                toast.error('network error please try again');
            } else if (response.status === 401) {
                // error in credentials     
                toast.error('error wrong credentials');
            }
            throw new Error('Network response was not ok');
        }
        return response.json(); // This returns a promise that resolves to the JSON content
    })
    .then(result => {
        //set JWT token to be used
        localStorage.setItem('JWT', result.jwt);
        
        router.push('/home')
    })
    .catch(err => {
        // error handling
        console.error(err);
    });
}
</script>
<template>
    <div class="w-[min(100%,430px)] md:w-[min(80%,500px)] mx-auto rounded-[42px] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)] bg-white z-10 md:h-[566px]  relative" >
        <div :class="'w-full h-[30px] md:h-[50px] rounded-[11px] shadow-[0_4px_10px_1px_rgba(12,12,12,.37) duration-[500ms] '"></div>
        <form @submit.prevent="handleSubmit">

        <div class="px-5 md:px-10 pb-14 md:pb-10 ">
            <div :class="'MontserratBold text-[24px] md:text-[32px] mx-auto w-fit py-2 md:pt-4 md:pb-10 duration-[500ms] '">Login</div>

            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">Username</div>
            <input v-model="userNameRef" name="username" class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>

            <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">Password</div>
            <input type="password" v-model="passwordRef" name="password" class="w-full h-[25px] border-b-2 border-solid border-black mb-5"/>

            <div class="DarkerGrotesque md:text-[14px] text-[12px] text-[#A09F9F] w-fit ml-auto mb-10 md:mb-20">Forget Password?</div>

            <button :class="'w-full text-[18px] md:text-[24px] text-white rounded-[12px]  pt-2 pb-2 DarkerGrotesqueBold duration-[500ms] bg-[black]' ">Login</button>
        </div>
    </form>

    </div>
</template>
