<script setup>
/* eslint-disable no-undef */
import { onMounted } from 'vue';
import {Loader} from '@googlemaps/js-api-loader'

const loader = new Loader({apiKey:'AIzaSyAPaP9MpivH3XKsUdsYXSiQzWaNmOjQX3o'})
onMounted(async () => {
  await loader.load() ;

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const mapOptions = {
    zoom: 9,
    center: { lat: 61.180059, lng: -149.822075 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  };
  const map = new google.maps.Map(document.getElementById('map'),mapOptions)

  directionsRenderer.setMap(map);

  directionsService
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
    .catch((e) => window.alert("Directions request failed due to " + e));

//window.initMap = initMap;
  //const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  //console.log(typeof map);
});
</script>

<template>
  
  <div id="map" class="w-full h-auto aspect-[2/1.5]"></div>
</template>
