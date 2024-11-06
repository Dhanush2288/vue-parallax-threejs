<template>
  <div id="app">
    <router-view /> <!-- This will render the matched component -->
  </div>
</template>

<script>
import SmoothScroll from './components/SmoothScroll.vue';

export default {
  name: 'App',
  components: {
    SmoothScroll,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: 'Bruce Forever';
  src: url('@/assets/BruceForeverRegular-X3jd2.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
body{
  margin: 0;
}
</style>
