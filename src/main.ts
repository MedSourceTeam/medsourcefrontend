import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import "@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore({
  state: {
    backURL: "http://127.0.0.1:8000",
    isAuth: false,
  },
  mutations: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
