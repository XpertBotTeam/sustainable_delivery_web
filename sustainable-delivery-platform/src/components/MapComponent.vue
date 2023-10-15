<script setup>
/* eslint-disable no-undef */
import { onMounted} from 'vue';
import {Loader} from '@googlemaps/js-api-loader'

//generate unique key for mapid
import { v4 as uuidv4 } from 'uuid';
const uniqueId = uuidv4();

//define props
const props = defineProps(['center','destination'])


//define emit events

const loader = new Loader({apiKey:process.env.VUE_APP_GOOGLE_API_KEY})    
onMounted(async () => {
  try{
    setTimeout(async()=>{
    await loader.load() ;




  //map options to set  
  const mapOptions = {
    zoom: 12,
    center: props.center ,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  };


  //generate map
  const map =  new google.maps.Map(document.getElementById(uniqueId),mapOptions)
  map.setCenter(props.center);

  const marker = new google.maps.Marker({
    position:{lat:parseFloat(props.center.lat),lng:parseFloat(props.center.lng)} ,
    map,
    title: "Hello World!",
  })


  if(map && marker && props.center && props.destination){

    const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

directionsService
  .route({
    origin: props.center,
    
    destination: 
    props.destination?{lat:parseFloat(props.destination.lat),lng:parseFloat(props.destination.lng)} : {lng:33,lat:35}
    ,
    travelMode: google.maps.TravelMode.DRIVING,
  })
  .then((response) => {
    directionsRenderer.setDirections(response);
  })
  .catch((e) => window.alert("Directions request failed due to " + e));


const watchId = navigator.geolocation.watchPosition(
(position) => {
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  // Update the map and marker with current location
  //map.setCenter(pos);
  //marker.setPosition(pos);
  console.log(pos)

  // Calculate route to destination
  

  
},
() => {
  // Handle errors here
}
);
console.log(watchId)
}


/*var marker = new google.maps.Marker({
position: props.center,
map: map,
});
console.log(marker)*/



console.log(typeof(map))



  },[2000])
  }
  catch(err){

  }
  
  
})
  



 

 


  //get location
 

 
</script>

<template>
  
  <div :id="uniqueId"></div>
</template>
