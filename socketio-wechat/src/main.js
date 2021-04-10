import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SocketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'
Vue.config.productionTip = false
Vue.use(new SocketIO({
  debug: true,
  connection: ClientSocketIO.connect('localhost:3000/')
}))
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
