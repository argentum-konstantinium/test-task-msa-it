import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js';
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
import Order from '../views/Order.vue';
import NotFoundError from '../views/NotFoundError.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
     
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter(to, from, next) {
      if (store.getters.authStatus) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/orders/:id',
    name: 'order',
    component: Order,
    props: true,
    beforeEnter(to, from, next) {
      if (store.getters.authStatus) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: "/*",
    component: NotFoundError
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
