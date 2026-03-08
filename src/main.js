import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Includes Popper.js 
// Don't think bootstrap js is needed. It says on the website that it's not really compatible due to the use of jQuery 


import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/scss/styles.scss'

createApp(App).use(store).mount('#app')
