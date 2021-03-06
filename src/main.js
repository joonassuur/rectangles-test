import Vue from 'vue';
import UUID from 'vue-uuid';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  UUID,
  render: (h) => h(App),
}).$mount('#app');
