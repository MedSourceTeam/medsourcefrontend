<template>
  <form v-on:submit.prevent="buscar">
    <div class="form-group">
      <label for="">Nombre del paciente</label>
      <input type="text" class="form-control" v-model="paciente_nombre" />
    </div>
    <div class="form-group">
      <label for="">Identificación del paciente</label>
      <input
        type="number"
        class="form-control"
        v-model="paciente_identificacion"
      />
    </div>
    <div class="form-group">
      <label for="">Nombre del antecedente</label>
      <input type="text" class="form-control" v-model="antecedente_nombre" />
    </div>
    <div class="form-group">
      <label for="">Tipo de antecedente</label>
      <input type="text" class="form-control" v-model="antecedente_tipo" />
    </div>
    <div class="form-group">
      <label for="">Clase de antecedente</label>
      <input type="text" class="form-control" v-model="antecedente_calse" />
    </div>
    <button type="submit">Buscar</button>
  </form>
  <div v-if="resultados">
    <h2>Resultados de busqueda</h2>
    <AntecedenteListItem
      v-for="antecedente in antecedentes"
      :antecedente="antecedente"
      :key="antecedente"
    />
  </div>
</template>

<script>
import AntecedenteListItem from "@/components/AntecedenteListItem.vue";
import axios from "axios";

export default {
  name: "VistaAsignacionAntecedente",

  data: function() {
    return {
      antecedentes: [],
      paciente_nombre: "",
      paciente_identificacion: "",
      antecedente_nombre: "",
      antecedente_tipo: "",
      antecedente_calse: "",
      resultados: false,
    };
  },

  components: {
    AntecedenteListItem,
  },

  methods: {
    buscar: async function() {
      axios
        .get(this.$store.state.backURL + "/mostrar_antecedentes", {
          params: {
            patient_identification: this.paciente_identificacion,
            patient_name: this.paciente_nombre,
            record_name: this.antecedente_nombre,
            record_kind: this.antecedente_calse,
            record_sort: this.antecedente_tipo,
          },
        })
        .then((response) => {
          this.resultados = true;
          this.antecedentes = response.data;
        })
        .catch((e) => {
          console.log(e);
          alert("Se presento un error en la busqueda.");
        });
    },
  },
};
</script>

<style></style>
