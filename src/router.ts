import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import Registro from "./views/RegistroMedico.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/medico",
    name: "medico",
    component: Home,
  },
  {
    path: "/registro",
    name: "medicoregistro",
    component: Registro,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
