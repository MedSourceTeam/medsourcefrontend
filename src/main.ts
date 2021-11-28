import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";

const store = createStore({
  state: {
    backURL: "http://127.0.0.1:8000",
  },
  mutations: {},
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
