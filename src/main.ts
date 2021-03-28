import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
