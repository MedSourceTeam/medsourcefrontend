import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import "@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./state";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
