import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './main.css';

Vue.config.productionTip = false;

// Elements
Vue.component('button-primary', () => import('@/elements/ButtonPrimary.vue' /* webpackChunkName: 'button-primary' */));
Vue.component('button-secondary', () => import('@/elements/ButtonSecondary.vue' /* webpackChunkName: 'button-secondary' */));

// Oscillator Components
Vue.component('oscillator-controller', () => import('@/components/OscillatorController.vue' /* webpackChunkName: 'oscillator-controller' */));
Vue.component('wave-types', () => import('@/components/WaveTypes.vue' /* webpackChunkName: 'wave-types' */));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
