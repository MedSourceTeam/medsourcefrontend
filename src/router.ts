import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import RegistroMedico from "./views/RegistroMedico.vue";
import RegistroEnfermero from "./views/RegistroEnfermero.vue";
import RegistroDesarrolloProcedimiento from "./views/RegistroDesarrolloProcedimiento.vue";
import RegistroPaciente from "./views/RegistroPaciente.vue";
import RegistroConsulta from "./views/RegistroConsulta.vue";
import Login from "./views/Login.vue";
import RecuperarContrasena from "./views/RecuperarContrasena.vue";
import RegistroProcedimiento from "./views/RegistroProcedimiento.vue";
import RegistroAntecedente from "./views/RegistroAntecedente.vue";
import VinculacionAntecedente from "./views/RegistroPacienteAntecedente.vue";
import BusquedaPaciente from "./views/BusquedaPacientes.vue";
import BusquedaDesarrollo from "./views/BusquedaDesarrollos.vue";
import BusquedaProcedimiento from "./views/BusquedaProcedimientos.vue";
import VistaAsignacionAntecedentes from "@/views/VistaAsignacionAntecedente.vue";
import BusquedaAntecedente from "./views/BusquedaAntecedentes.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: "login",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/recuperarcontrasena/:token",
    name: "cambioContrasena",
    component: RecuperarContrasena,
  },
  {
    path: "/recuperarcontrasena",
    name: "cambioContrasenaEmail",
    component: RecuperarContrasena,
  },
  {
    path: "/medico",
    name: "medico",
    redirect: "home",
  },
  {
    path: "/registro/medico",
    name: "medicoregistro",
    component: RegistroMedico,
  },
  {
    path: "/enfermero",
    name: "enfermero",
    redirect: "home",
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
    path: "/registro/paciente",
    name: "pacienteregistro",
    component: RegistroPaciente,
  },
  {
    path: "/pacientes",
    name: "pacientebusqueda",
    component: BusquedaPaciente,
  },
  {
    path: "/registro/procedimiento",
    name: "procedimientoregistro",
    component: RegistroProcedimiento,
  },
  {
    path: "/registro/antecedente",
    name: "antecedenteregistro",
    component: RegistroAntecedente,
  },
  {
    path: "/vinculacion/antecedente",
    name: "antecedentevinculacion",
    component: VinculacionAntecedente,
  },
  {
    path: "/registro/consulta",
    name: "consultaregistro",
    component: RegistroConsulta,
  },
  {
    path: "/desarrollos",
    name: "desarrollobusqueda",
    component: BusquedaDesarrollo,
  },
  {
    path: "/procedimientos",
    name: "procedimientobusqueda",
    component: BusquedaProcedimiento,
  },
  {
    path: "/antecedentesPaciente",
    name: "antecedentesPaciente",
    component: VistaAsignacionAntecedentes,
  },
  {
    path: "/antecedentes",
    name: "antecedentebusqueda",
    component: BusquedaAntecedente,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
