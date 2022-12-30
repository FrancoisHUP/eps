import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import  router from "./Router/index"

Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  vuetify,
  render: h => h(App)
})
export default router;
