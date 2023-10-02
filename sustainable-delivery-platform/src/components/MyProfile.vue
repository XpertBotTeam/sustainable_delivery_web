<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {   faLocationDot, faPenToSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import MapComponent from "./MapComponent.vue";
</script>
<template>
  <div
    class="w-full rounded-[12px] bg-white relative shadow-[0_4px_10px_1px_#0C0C0C5E]"
  >
    <div class="flex py-10">
      <div class="w-[55%] pl-14">
        <div class="flex gap-14">
          <div class="flex justify-between items-start flex-1">
            <div class="DarkerGrotesque text-[16px]">
              Update profile picture
            </div>
            <button>
              <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
            </button>
          </div>

          <div class="flex-1">
            <div class="flex justify-between items-center mb-5">
              <div class="DarkerGrotesque text-[16px]">
                Full Name
              </div>
              <div class="Roboto text-[14px] text-[#929292]">
                Hamden
              </div>
              <button>
                <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
              </button>
            </div>

            <div class="flex justify-between items-center mb-5">
              <div class="DarkerGrotesque text-[16px]">
                Email
              </div>
              <div class="Roboto text-[14px] text-[#929292]">
                Hamden@hamden.com
              </div>
              
            </div>
            
<div class="mb-5">
            <div class="flex justify-between items-center mb-[12px]">
              <div class="DarkerGrotesque text-[16px] flex items-center">
                <FontAwesomeIcon class="mr-[10px]" :icon="faLocationDot"/>
                <div>Location</div>
              </div>
              <button>
                <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
              </button>
              
            </div>
            <MapComponent></MapComponent>
          </div>

            


            <div class="mb-5">
              <div class="DarkerGrotesque text-[16px] flex items-center">
                <FontAwesomeIcon class="mr-[10px]" :icon="faPhone"/>
                <div>Contact Info</div>
              </div>

              <div class="flex justify-between items-center mb-5">
              <div class="Roboto text-[14px] text-[#929292]">
                Hamden@hamden.com
              </div>
              <button>
                <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon>
              </button>
              
            </div>
            </div>

          </div>


        </div>
      </div>
      <div class="w-[45%]">
        <img
          class="w-full translate-x-[10%]"
          src="../assets/MotorcycleAll.png"
        />
      </div>
    </div>
    <div class="translate-y-[50%] gap-10 flex mx-auto w-max">
      <button class="min-w-[250px] block orderButton">Save Changes</button>
      <button class="min-w-[250px] block orderButton">Discard</button>
    </div>
  </div>
</template>
