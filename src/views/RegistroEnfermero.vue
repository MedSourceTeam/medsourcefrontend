<template>
  <div class="container text-center">
    <div class="col col-11 col-md-6">
      <h2>Registrarse</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Correo Electronico</label>
          <input type="email" v-model="enfermero.user.username" />
        </div>
        <div class="form-group text-left">
          <label for="">Contraseña</label>
          <input type="password" v-model="enfermero.user.password" />
        </div>

        <div class="form-group text-left">
          <label for="">Nombres</label>
          <input type="text" v-model="enfermero.user.first_name" />
        </div>
        <div class="form-group text-left">
          <label for="">Apellidos</label>
          <input type="text" v-model="enfermero.user.last_name" />
        </div>
        <div class="form-group text-left">
          <label for="">Numero de Documento</label>
          <input type="number" v-model="enfermero.identification" />
        </div>
        <div class="form-group text-left">
          <label for="">Nivel Educativo</label>
          <select v-model="enfermero.education">
            <option disabled value="">Seleccione un elemento</option>
            <option v-for="nivel in nivelesEducativos" :key="nivel">{{
              nivel
            }}</option>
          </select>
        </div>
        <div class="form-group text-left">
          <label for="">Area</label>
          <input type="text" v-model="enfermero.area" />
        </div>
        <div class="form-group text-left">
          <label for="">Hospital</label>
          <select v-model="enfermero.idHospital">
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
  name: "RegistroEnfermero",

  data: function() {
    return {
      enfermero: {
        user: {
          username: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
        },
        identification: "",
        education: null,
        area: "",
        idHospital: null,
      },
      nivelesEducativos: [
        "Pregrado",
        "Postgrado",
        "Maestria",
        "Doctorado",
        "PostDoctorado",
      ],
      hospitales: [],
    };
  },

  methods: {
    backLogin: function() {
      //TODO: cambiar cuando exista login
      this.$router.push({ name: "home" });
    },
    processSignUp: function() {
      this.enfermero.user.email = this.enfermero.user.username;
      axios
        .post("http://127.0.0.1:8000/enfermero/registro", this.enfermero)
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
        .get("http://127.0.0.1:8000/hospital")
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
