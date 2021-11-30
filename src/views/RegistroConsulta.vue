<template>
  <div class="container text-center">
    <div class="col col-11 col-md-6">
      <h2>Registrarse</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Numero de Documento del Paciente</label>
          <input type="number" v-model="consulta.identification_patient" />
        </div>
        <div class="form-group text-left">
          <label for="">Numero de Documento del Doctor</label>
          <input type="number" v-model="consulta.identification_doctor" />
        </div>
        <div class="form-group text-left">
          <label for="">Pulso</label>
          <input type="number" v-model="consulta.pulse" />
        </div>
        <div class="form-group text-left">
          <label for="">Altura</label>
          <input type="number" v-model="consulta.height" />
        </div>
        <div class="form-group text-left">
          <label for="">Peso</label>
          <input type="number" v-model="consulta.weight" />
        </div>
        <div class="form-group text-left">
          <label for="">Pa</label>
          <input type="number" v-model="consulta.pa" />
        </div>
        <div class="form-group text-left">
          <label for="">Pr</label>
          <input type="number" v-model="consulta.pr" />
        </div>
        <div class="form-group text-left">
          <label for="">T</label>
          <input type="number" v-model="consulta.t" />
        </div>
        
        <div class="form-group text-left">
          <label for="">Medicamentos</label><br />
          <textarea v-model="consulta.medication"> Enter text here...</textarea>
        </div>

        <div class="form-group text-left">
          <label for="">Sintoma</label><br />
          <textarea v-model="consulta.symptom"> Enter text here...</textarea>
        </div>

        <div class="form-group text-left">
          <label for="">Diagnostico</label><br />
          <textarea v-model="consulta.diagnosis"> Enter text here...</textarea>
        </div>      
        
        <div class="form-group text-left">
          <label for="">Hospital</label>
          <select v-model="consulta.id_hospital">
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="hospital in hospitales"
              :key="hospital"
              :value="hospital.id"
              >{{ hospital.name }}</option
            >
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Registrarse</button>
        <button type="button" class="btn btn-primary" v-on:click="backLogin"> Volver</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistroConsulta",

  data: function() {
    return {
      consulta: {
        identification_patient: null,
        identification_doctor: null,
        pulse: null,
        height:null,
        weight:null,
        pa:null,
        pr:null,
        t:null,
        medication:"",
        symptom:"",
        diagnosis:"",
        id_hospital: null,
      },
      hospitales: [],
    };
  },

  methods: {
    backLogin: function() {
      this.$router.push({ name: "login" });
    },
    processSignUp: function() {
            console.log(this.procedimiento);

      axios
        .post(this.$store.state.backURL + "/consulta/ingreso", this.consulta)
        .then((result) => {
          alert("Registro Exitoso");
          this.backLogin();
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo en el registro.");
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
  },
};
</script>
