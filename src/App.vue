<template>
  <SideBar v-if="store.state.isAuth == true" />
  <!-- <div
    v-if="store.state.isAuth == true"
    v-bind:style="{ 'margin-left': sideBarWidth }"
  >
    <router-view />
  </div> -->
  <div :style="{'margin-left': ml }"><router-view /></div>
</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
import { sideBarWidth } from "@/components/sidebar/state";
import { useStore } from './state';

export default {
  components: {
    SideBar,
  },
  computed: {
    ml(){
      return this.store.state.isAuth ? sideBarWidth : 0;
    },
  },
  setup() {
    const store = useStore();
    return { sideBarWidth, store};
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
