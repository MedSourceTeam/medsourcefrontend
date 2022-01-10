<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Registrar Antecedente</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Numero de Documento del Paciente</label>
          <input
            type="number"
            class="form-control"
            v-model="paciente_antecedente.idPatient"
            :disabled="validPatient"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          v-if="!validPatient"
          v-on:click="searchPatient"
        >
          Buscar paciente
        </button>
        <p v-if="validPatient">
          <strong>Paciente: </strong> {{ patient.full_name }}
        </p>
        <div v-if="validPatient">
          <div class="form-group text-left">
            <label for="">Antecedente</label>
            <select
              class="custom-select"
              v-model="paciente_antecedente.idRecord"
            >
              <option disabled value="">Seleccione un elemento</option>
              <option
                v-for="antecedente in antecedentes"
                :key="antecedente"
                :value="antecedente.id"
              >
                {{ antecedente.name }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn m-1 btn-primary">
            Vincular Antecedente con Paciente
          </button>
          <button
            type="button"
            class="btn m-1 btn-primary"
            v-on:click="goBackHome"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VinculacionAntecedente",
  data: function () {
    return {
      patient: null,
      validPatient: false,
      paciente_antecedente: {
        idPatient: null,
        idRecord: null,
      },
      antecedentes: [],
    };
  },
  methods: {
    goBackHome: function () {
      this.$router.push({ name: "home" });
    },
    processSignUp: function () {
      if (this.validPatient)
        axios
          .post(
            this.$store.state.backURL + "/vinculacion_antecedente/ingreso",
            this.paciente_antecedente
          )
          .then((result) => {
            alert("Antecedente vinculado con éxito");
            this.goBackHome();
          })
          .catch((error) => {
            console.log(error.response);
            alert("ERROR: Fallo durante la vinculación del antecedente");
          });
    },

    getAntecedentes: function () {
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

    searchPatient: function () {
      axios
        .get(
          this.$store.state.backURL +
            "/paciente/" +
            this.paciente_antecedente.idPatient
        )
        .then((response) => {
          this.patient = response.data;
          this.validPatient = true;
        })
        .catch((error) => {
          if (error.response.status == 404)
            alert(
              "El paciente ingresado no se encuentra registrado en el sistema"
            );
          else alert("Se presento un error al buscar el paciente");
        });
    },
  },
  created: function () {
    this.getAntecedentes();
  },
};
</script>
