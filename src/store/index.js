import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userAuth: false,
    orders: [],
  },
  mutations: {
    setUserAuth: (state, userAuth) => {
      state.userAuth = userAuth;
      document.cookie = `userAuth=${userAuth}; expires=${new Date(Date.now() + 86400e3).toUTCString()};`;
    },
    setUserAuthFromCookie: (state) => {
      let cookieName = 'userAuth';
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      matches ? matches = decodeURIComponent(matches[1]) : matches = undefined;
      if (matches) {
        state.userAuth = Boolean(matches);
      }
    },
    setOrders: (state, orders) => {
      state.orders = orders;
      state.ordersQuantity = orders.length;
    },
    setOrderAfterCancel: (state, newOrder) => {
      state.orders = state.orders.map(order => {
        if (order.id === newOrder.id) {
          order = newOrder;
        }
        return order;
      });
      console.log(state.orders)
    },
    setNewOrder: (state, paylodad) => {
      let { id, orders } = paylodad;
      const msInDay = 1000*60*60*24;
      const now = new Date();
      orders.forEach(order => {
        if (id === order.id) {
          order.orderDate = now.toISOString().slice(0, 10);
          order.deliveries.forEach(delivery => {
             
            const msInDeliveryDays = msInDay * delivery.days;
            const deliveryDate = new Date(now.valueOf() + msInDeliveryDays);
            const deliveryDateString = deliveryDate.toISOString().slice(0, 10)
            delete delivery.days;
            delivery.date = deliveryDateString;
          });
          order.id = state.orders.length + 1;
          state.orders.push(order);
        }
      })
    }
  },
  actions: {
    authorizeUser({ commit }, authState) {
      commit('setUserAuth', authState);
    },
    authorizeFromCookie({ commit }) {
      commit('setUserAuthFromCookie');
    },
    getOrders: async function ({ commit }, orders) {
      let response = await fetch("/json/orders.json", {
        method: "GET",
      });
      if (response.status === 200) {
        response = await response.json();
        commit('setOrders', response)
      } else {
        alert('Произошла ошибка');
      }


    },
    cancelOrder: async function ({ commit }, order) {
      /* let response = await fetch('', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json,
          'Content-Type' 'application/json,
        },
        body: JSON.stringify(order),
      })
      if (response.status === 200) {
        response = await response.json();
        commit('setOrderAfterCancel', response);
      } else {
        alert('Произошла ошибка');
      }
       */
      commit('setOrderAfterCancel', order);
    },
    duplicateOrder: async function ({ commit }, id) {

      let response = await fetch('/json/products.json', {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      });
      response = await response.json();
      commit('setNewOrder', { id: id, orders: response });

    }
  },
  getters: {
    authStatus(state) {
      return state.userAuth;
    },
    orders(state) {
      return state.orders;
    }
  },
  modules: {
  }
})
export default store;
