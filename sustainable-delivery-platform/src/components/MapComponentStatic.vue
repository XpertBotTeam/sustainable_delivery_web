<script setup>
/* eslint-disable no-undef */
import { onMounted,defineEmits } from 'vue';
import {Loader} from '@googlemaps/js-api-loader'

//generate unique key for mapid
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits(['onLocationChange'])
const uniqueId = uuidv4();

//define props
const props = defineProps(['center'])


const loader = new Loader({apiKey:process.env.VUE_APP_GOOGLE_API_KEY})    
onMounted(async () => {
  

    
    await loader.load() ;




  //map options to set  
  const mapOptions = {
    zoom: 12,
    center: {lat:parseFloat(props.center.lat),lng:parseFloat(props.center.lng)} ,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  };


  //generate map
  const map =  new google.maps.Map(document.getElementById(uniqueId),mapOptions)

  const marker = new google.maps.Marker({
    position:{lat:parseFloat(props.center.lat),lng:parseFloat(props.center.lng)} ,
    map,
    title: "Hello World!",
  })

  map.addListener("click", (mapsMouseEvent) => {
    emit('onLocationChange',mapsMouseEvent.latLng);
    marker.setPosition(mapsMouseEvent.latLng)
  });

  console.log(marker)


 

  }
 )
  



 

 


  //get location
 

 
</script>

<template>
  
  <div :id="uniqueId"></div>
</template>
