<template>
  <div class="sidebar" :style="{ width: sideBarWidth, overflow: 'scroll' }">
    <h1>
      <span v-if="collapsed">
        <div>M</div>
        <div>S</div>
      </span>
      <span v-else>MedSource</span>
    </h1>
    <side-bar-link to="/home" icon="fas fa-home">Home</side-bar-link>
    <side-bar-link to="/registro/procedimiento" icon="fas fa-procedures"
      >Registrar Procedimiento</side-bar-link
    >
    <side-bar-link to="/procedimientos" icon="fas fa-procedures"
      >Buscar Procedimientos</side-bar-link
    >
    <side-bar-link to="/registro/desarrollo" icon="fas fa-procedures"
      >Registrar Desarrollo de Procedimiento</side-bar-link
    >
    <side-bar-link to="/desarrollos" icon="fas fa-procedures"
      >Buscar Procedimientos Desarrollados</side-bar-link
    >
    <side-bar-link to="/registro/paciente" icon="fas fa-hospital-user"
      >Registrar Paciente</side-bar-link
    >
    <side-bar-link to="/pacientes" icon="fas fa-hospital-user"
      >Buscar Pacientes</side-bar-link
    >
    <side-bar-link to="/registro/antecedente" icon="fas fa-file-medical"
      >Registrar Antecedentes</side-bar-link
    >
    <side-bar-link to="/antecedentes" icon="fas fa-file-medical"
      >Buscar Antecedentes</side-bar-link
    >
    <side-bar-link to="/vinculacion/antecedente" icon="fas fa-book-medical"
      >Vincular Antecedentes</side-bar-link
    >
    <side-bar-link to="/antecedentesPaciente" icon="fas fa-book-medical"
      >Buscar Antecedentes Vinculados</side-bar-link
    >
    <side-bar-link to="/registro/consulta" icon="fas fa-diagnoses"
      >Registrar Consultas</side-bar-link
    >
    <side-bar-link to="/consultas" icon="fas fa-diagnoses"
      >Buscar Consultas</side-bar-link
    >
    <side-bar-link to="/medicos" icon="fas fa-hand-holding-medical"
      >Buscar Medicos</side-bar-link
    >
    <side-bar-link to="/enfermeros" icon="fas fa-hand-holding-heart"
      >Buscar Enfermeros</side-bar-link
    >
    <span
    a
      class="collapsed-icon"
      :class="{ 'rotate-180': collapsed }"
      v-on:click="toggleSideBar"
    >
      <i class="fas fa-angle-double-left"></i>
    </span>
  </div>
</template>

<script>
import { collapsed, toggleSideBar, sideBarWidth } from "./state";
import SideBarLink from "./SideBarLink.vue";

export default {
  name: "SideBar",
  components: {
    SideBarLink,
  },
  setup() {
    return { collapsed, toggleSideBar, sideBarWidth };
  },
};
</script>

<style>
:root {
  /**--sideBar-bg-color: #0f8bff;
  --sideBar-item-hover: #52a5f1;
  --sideBar-item-active: #0065c4;**/
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sideBar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.collapsed-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

::-webkit-scrollbar {
  display: none;
}
</style>
