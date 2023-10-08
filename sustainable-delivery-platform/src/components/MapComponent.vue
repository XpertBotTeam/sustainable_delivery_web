<script setup>
/* eslint-disable no-undef */
import { onMounted, defineEmits} from 'vue';
import {Loader} from '@googlemaps/js-api-loader'

//generate unique key for mapid
import { v4 as uuidv4 } from 'uuid';
const uniqueId = uuidv4();

//define props
const props = defineProps(['center'])


//define emit events
const emit = defineEmits(['onLocationChange'])

const loader = new Loader({apiKey:process.env.VUE_APP_GOOGLE_API_KEY})
onMounted(async () => {
  await loader.load() ;

  //const directionsService = new google.maps.DirectionsService();
  //const directionsRenderer = new google.maps.DirectionsRenderer();


  //map options to set  
  const mapOptions = {
    zoom: 14,
    center: props.center?props.center:{ lat: 61.180059, lng: -149.822075 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  };

  //generate map
  const map = new google.maps.Map(document.getElementById(uniqueId),mapOptions)

  const marker = new google.maps.Marker({
    position: props.center ,
    map,
    title: "Hello World!",
  })
  console.log(marker)



  //get location
  map.addListener("click", (mapsMouseEvent) => {
    emit('onLocationChange',mapsMouseEvent.latLng);
    marker.setPosition(mapsMouseEvent.latLng)
  });
  
  
  

  
  /*var marker = new google.maps.Marker({
      position: props.center,
      map: map,
   });
   console.log(marker)*/

  console.log(typeof(map))

  //directionsRenderer.setMap(map);

  /*directionsService
    .route({
      origin: { lat: 62.180059, lng: -149.822075 },
      
      destination: 
      { lat: 61.180059, lng: -149.822075 }
      ,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + e));*/


});
</script>

<template>
  
  <div :id="uniqueId"></div>
</template>
