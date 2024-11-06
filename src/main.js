import router from './router' 
import { createApp } from 'vue';
import App from './App.vue';
import { ParallaxPlugin } from 'vue-scroll-parallax';
import { VueScrollParallax } from 'vue-scroll-parallax';

const app = createApp(App);
app.use(VueScrollParallax);
app.use(router);
app.mount('#app');
