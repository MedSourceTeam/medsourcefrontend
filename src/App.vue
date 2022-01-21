<template>
  <SideBar v-if="store.state.isAuth == true" />
  <div class="router" v-bind:style="{ 'margin-left': marginLeft }">
    <router-view />
  </div>
</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
import { sideBarWidth } from "@/components/sidebar/state";
import { useStore } from "./state";

export default {
  data: function() {
    return {
      marginLeft: this.store.state.isAuth ? sideBarWidth : 0,
    };
  },
  components: {
    SideBar,
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
</style>
