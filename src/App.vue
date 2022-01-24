<template>
  <SideBar v-if="store.state.isAuth == true" />
  <div class="router" v-bind:style="{ 'margin-left': marginLeft }">
    <router-view />
  </div>
  <pulse-loader
    :class="{ loader: loading }"
    :loading="loading"
    :color="'#558eff'"
    :size="'100px'"
  ></pulse-loader>
</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
import { sideBarWidth } from "@/components/sidebar/state";
import { useStore } from "./state";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  data: function() {
    return {
      marginLeft: this.store.state.isAuth ? sideBarWidth : 0,
    };
  },
  computed: {
    loading() {
      return this.store.state.loading;
    },
  },
  components: {
    SideBar,
    PulseLoader,
  },
  setup() {
    const store = useStore();
    return { store, sideBarWidth };
  },
};
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css);
@import url(https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css);
@import "./styles/main.css";

#app {
  font-family: Lato, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loader {
  position: absolute;
  background-color: #5252528f;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
