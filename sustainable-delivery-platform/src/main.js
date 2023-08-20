import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './app.css'

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCartShopping,faChevronUp } from '@fortawesome/free-solid-svg-icons';

library.add(faCartShopping);
library.add(faChevronUp)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app')
