import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import ParallaxWith3D from '../components/ParallaxWith3D.vue';
import SmoothScroll from '../components/SmoothScroll.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: SmoothScroll
  },
  {
    path: '/posts',
    name: 'posts',
    component: ParallaxWith3D
  },  {
    path: '/roo',
    name: 'roo',
    component: HelloWorld
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
