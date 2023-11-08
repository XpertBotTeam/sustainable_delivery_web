<script setup>
//props
import { defineProps } from "vue";

//vue router
import { useRouter } from "vue-router";

//define router
const router = useRouter();

//ref variables
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//define ref variables
const userNameRef = ref("");
const passwordRef = ref("");
const firstNameRef = ref("");
const lastNameRef = ref("");
const loading = ref(false);

//define props variables
const props = defineProps(["Type"]);

const toast = useToast()

//handle form submission
const handleSubmit = async () => {
  //extract form data
  const formData = {
    name: `${firstNameRef.value} ${lastNameRef.value}`,
    userName: userNameRef.value,
    password: passwordRef.value,
    type: props.Type,
  };

  try {
    //define headers
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formData),
      redirect: "follow",
    };
    loading.value = true
    //sending request
    fetch(`http://localhost:3000/auth/signup`, requestOptions)
      .then(async (response) => {
        loading.value=false
        return await response.json(); // This returns a promise that resolves to the JSON content
      })
      .then((result) => {
        console.log(result)
        if(result.message.toString() === 'Signup successful'){
          //signup succesful
          router.push('/login')
        }else if(result.message.toString() === 'user already found'){
          toast.info(message.toString())
        }
          else{
          result.message.forEach(value => {
            //alert the messages
            toast.error(value.msg || value);
          })
          
        }
        
      })
      .catch((err) => {
        loading.value=false
        // error handling
        console.error(err);
      });

  } catch (error) {
    //error handling
    console.error("Error:", error);
  }
};
</script>
<template>
  <div
    class="w-[min(100%,430px)] md:w-[min(80%,500px)] mx-auto rounded-[42px] bg-white shadow-[0_4px_10px_1px_rgba(12,12,12,0.37)]"
  >
    <div
      :class="
        'w-full h-[30px] md:h-[50px] rounded-[11px] shadow-[0_4px_10px_1px_rgba(12,12,12,.37) duration-[500ms] ' +
        (props.Type === 'Company' ? 'bg-[#FF9900]' : '') +
        (props.Type === 'DeliveryGuy' ? 'bg-[#01AB78]' : '') +
        (props.Type === 'User' ? 'bg-[#8C8C8C]' : '')
      "
    ></div>
    <form @submit.prevent="handleSubmit">
      <div class="px-5 md:px-10 pb-5 md:pb-10">
        <div
          :class="
            'MontserratBold text-[24px] md:text-[32px] mx-auto w-fit py-2 md:py-4 duration-[500ms] ' +
            (props.Type === 'Company' ? 'text-[#FF9900]' : '') +
            (props.Type === 'DeliveryGuy' ? 'text-[#01AB78]' : '') +
            (props.Type === 'User' ? 'text-[#8C8C8C]' : '')
          "
        >
          SIGN UP
        </div>

        <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">
          First Name
        </div>
        <input
          v-model="firstNameRef"
          :required="true"
          name="name"
          class="w-full h-[25px] border-b-2 border-solid border-black mb-5"
        />

        <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">
          Last Name
        </div>
        <input
          :required="true"
          v-model="lastNameRef"
          name="lname"
          class="w-full h-[25px] border-b-2 border-solid border-black mb-5"
        />

        <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">
          Email
        </div>
        <input
          v-model="userNameRef"
          required
          type="email"
          name="userName"
          class="w-full h-[25px] border-b-2 border-solid border-black mb-5"
        />

        <div class="text-[18px] md:text-[24px] text-[black] DarkerGrotesque">
          Password
        </div>
        <input
          v-model="passwordRef"
          minlength="8"
          :required="true"
          type="password"
          name="password"
          class="w-full h-[25px] md:text-[24px] border-b-2 border-solid border-black mb-2"
        />

        <div
          class="DarkerGrotesque md:text-[14px] text-[12px] text-[#A09F9F] w-fit mx-auto mb-3"
        >
          <router-link to="/Login"
            >Already a member?
            <span
              class="text-[black] text-[16px] md:text-[18px] ml-[10px] DarkerGrotesqueBold"
              >Login</span
            ></router-link
          >
        </div>
       
        <button
          :class="
            'w-full text-[18px] md:text-[24px] text-white rounded-[12px]  py-2 DarkerGrotesqueBold duration-[500ms] ' +
            (props.Type === 'Company' ? 'bg-[#FF9900]' : '') +
            (props.Type === 'DeliveryGuy' ? 'bg-[#01AB78]' : '') +
            (props.Type === 'User' ? 'bg-[#8C8C8C]' : '')
          "
        >
        
        <div v-if="loading" class="animate-spin w-fit h-fit mx-auto">
      <font-awesome-icon class="text-[white] text-[32px]" :icon="faSpinner"></font-awesome-icon>
    </div>
    <div v-else>
      Sign Up
    </div>
        </button>
      </div>
    </form>
  </div>
</template>
