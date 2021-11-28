<template>
  <div class="container text-center">
    <div class="col col-11 col-md-6">
      <h2>Registro Procedimiento</h2>
      <p v-if="result">
        Errror:, server returned:<br />
        {{ result }}
      </p>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Fecha</label>
          <input type="date" v-model="procedimiento.date" />
        </div>
        <div class="form-group text-left">
          <label for="">Numero de Documento del Paciente</label>
          <input type="number" v-model="procedimiento.identification_patient" />
        </div>
        <div class="form-group text-left">
          <label for="">Numero de Documento del Doctor</label>
          <input type="number" v-model="procedimiento.identification_doctor" />
        </div>
        <div class="form-group text-left">
          <label for="">Numero de Documento de la Enfermera</label>
          <input type="number" v-model="procedimiento.identification_nurse" />
        </div>
        <div class="form-group text-left">
          <label for="">Sala</label>
          <input type="number" v-model="procedimiento.room" />
        </div>
        <div class="form-group text-left">
          <label for="">Procedimiento</label><br />
          <select v-model="procedimiento.id_procedure">
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="procedimiento in procedimientos"
              :key="procedimiento"
              :value="procedimiento.id"
              >{{ procedimiento.name }}</option
            >
          </select>
        </div>
        <div class="form-group text-left">
          <label for="">Hospital</label><br />
          <select v-model="procedimiento.id_hospital">
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="hospital in hospitales"
              :key="hospital"
              :value="hospital.id"
              >{{ hospital.name }}</option
            >
          </select>
        </div>
        <div class="form-group text-left">
          <label for="">Comentario</label><br />
          <textarea v-model="procedimiento.comment">
Enter text here...</textarea
          >
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="registro">
          Registrar
        </button>
        <button type="button" class="btn btn-primary" v-on:click="backLogin">
          Volver
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistroProcedimiento",

  data: function() {
    return {
      procedimiento: {
        room: null,
        date: null,
        id_hospital: null,
        identification_patient: null,
        identification_nurse: null,
        identification_doctor: null,
        id_procedure: null,
        comment: "",
      },
      procedimientos: [],
      hospitales: [],
      result: null,
    };
  },

  methods: {
    backLogin: function() {
      //TODO: cambiar cuando exista login
      this.$router.push({ name: "home" });
    },
    registro: function() {
      console.log(this.procedimiento);
      axios
        .post(
          this.$store.state.backURL + "/desarrollo/ingreso",
          this.procedimiento
        )
        .then((result) => {
          alert("Registro Exitoso");
          this.backLogin();
        })
        .catch((error) => {
          console.log(error.response);
          this.result = error.response.data;
          alert("ERROR: Fallo en el registro.");
        });
    },

    getProcedimientos: function() {
      axios
        .get(this.$store.state.backURL + "/procedimientos/")
        .then((response) => {
          this.procedimientos = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo al obtener procedimientos");
        });
    },
    getHospitales: function() {
      axios
        .get(this.$store.state.backURL + "/hospital")
        .then((response) => {
          this.hospitales = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo al obtener hospitales");
        });
    },
  },

  created: function() {
    this.getHospitales();
    this.getProcedimientos();
  },
};
</script>
