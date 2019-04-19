import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './main.css';

Vue.config.productionTip = false;

Vue.component('button-primary', () => import('@/elements/ButtonPrimary.vue' /* webpackChunkName: 'button-primary' */));
Vue.component('button-secondary', () => import('@/elements/ButtonSecondary.vue' /* webpackChunkName: 'button-secondary' */));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
