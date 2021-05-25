import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/sass/main.sass'
import FocusVisible from './assets/js/focus-visible.js'
import './assets/json/orders.json'
window.focusVisible = new FocusVisible({
    attribute: 'data-focus-visible'
});
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
