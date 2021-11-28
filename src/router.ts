import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import RegistroMedico from "./views/RegistroMedico.vue";
import RegistroEnfermero from "./views/RegistroEnfermero.vue";
import RegistroDesarrolloProcedimiento from "./views/RegistroDesarrolloProcedimiento.vue";
import RegistroPaciente from "./views/RegistroPaciente.vue";

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
    path: "/registro/medico",
    name: "medicoregistro",
    component: RegistroMedico,
  },
  {
    path: "/enfermero",
    name: "enfermero",
    component: Home,
  },
  {
    path: "/registro/enfermero",
    name: "enfermeroregistro",
    component: RegistroEnfermero,
  },
  {
    path: "/registro/desarrollo",
    name: "desarrolloregistro",
    component: RegistroDesarrolloProcedimiento,
   },
   {
    path: "/paciente/registro",
    name: "pacienteregistro",
    component: RegistroPaciente,
   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
