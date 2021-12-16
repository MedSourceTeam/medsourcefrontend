<template>
  <form v-on:submit.prevent="buscar" class="col-11">
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
      paciente_nombre: null,
      paciente_identificacion: null,
      antecedente_nombre: null,
      antecedente_tipo: null,
      antecedente_calse: null,
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
            patient__identification__icontains: this.paciente_identificacion,
            patient__full_name__icontains: this.paciente_nombre,
            record__name__icontains: this.antecedente_nombre,
            record__kind__icontains: this.antecedente_calse,
            record__sort__icontains: this.antecedente_tipo,
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
