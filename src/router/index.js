import Vue from 'vue';
import VueRouter from 'vue-router';
import RectanglesContainer from '../views/RectanglesContainer.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'RectanglesContainer',
    component: RectanglesContainer,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
