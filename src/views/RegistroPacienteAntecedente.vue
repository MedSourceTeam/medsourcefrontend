<template>
  <div class="container text-center">
    <div class="col col-11 col-md-6">
      <h2>Registrar Antecedente</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Numero de Documento del Paciente</label>
          <input type="number" v-model="paciente_antecedente.idPatient" />
        </div>

        <div class="form-group text-left">
          <label for="">Antecedente</label>
          <select v-model="paciente_antecedente.idRecord">
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="antecedente in antecedentes"
              :key="antecedente"
              :value="antecedente.id"
              >{{ antecedente.name }}</option
            >
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Vincular Antecedente con Paciente
        </button>
        <button type="button" class="btn btn-primary" v-on:click="goBackHome">
          Volver
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VinculacionAntecedente",
  data: function() {
    return {
      paciente_antecedente: {
        idPatient: null,
        idRecord: null,
      },
      antecedentes: [],
    };
  },
  methods: {
    goBackHome: function() {
      this.$router.push({ name: "home" });
    },
    processSignUp: function() {
      axios
        .post(
          this.$store.state.backURL + "/vinculacion_antecedente/ingreso",
          this.paciente_antecedente
        )
        .then((result) => {
          alert("Antecedente vinculado con �xito");
          this.goBackHome();
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo durante la vinculación del antecedente");
        });
    },

    getAntecedentes: function() {
      axios
        .get(this.$store.state.backURL + "/antecedentes")
        .then((response) => {
          this.antecedentes = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo al obtener antecedentes");
        });
    },
  },
  created: function() {
    this.getAntecedentes();
  },
};
</script>
