<template>
  <div class="container text-center">
    <div class="col col-11 col-md-6">
      <h2>Registrarse</h2>
      <div v-if="!valid">
        <p class="alert alert-danger" role="alert">
          {{ error }}
        </p>
      </div>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">{{ fields.username }}*</label>
          <input type="email" v-model="enfermero.user.username" />
        </div>

        <div class="form-group text-left">
          <label for="">{{ fields.password }}*</label>
          <input type="password" v-model="enfermero.user.password" required />
        </div>
        <div class="form-group text-left">
          <label for="">Confirma tu contraseña*</label>
          <input type="password" v-model="verifyPassword" required />
        </div>

        <div class="form-group text-left">
          <label for="">{{ fields.first_name }}*</label>
          <input type="text" v-model="enfermero.user.first_name" required />
        </div>
        <div class="form-group text-left">
          <label for="">{{ fields.last_name }}*</label>
          <input type="text" v-model="enfermero.user.last_name" required />
        </div>
        <div class="form-group text-left">
          <label for="">{{ fields.identification }}*</label>
          <input type="number" v-model="enfermero.identification" required />
        </div>
        <div class="form-group text-left">
          <label for="">{{ fields.education }}*</label>
          <select v-model="enfermero.education" required>
            <option disabled value="">Seleccione un elemento</option>
            <option v-for="nivel in nivelesEducativos" :key="nivel">
              {{ nivel }}
            </option>
          </select>
        </div>
        <div class="form-group text-left">
          <label for="">{{ fields.area }}*</label>
          <input type="text" v-model="enfermero.area" required />
        </div>
        <div class="form-group text-left">
          <label for="">{{ fields.idHospital }}*</label>
          <select v-model="enfermero.idHospital" required>
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="hospital in hospitales"
              :key="hospital"
              :value="hospital.id"
            >
              {{ hospital.name }}
            </option>
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
import {
  email,
  required,
  helpers,
  minLength,
  between,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { MutationTypes, useStore } from '@/state';

const regexPassword = helpers.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export default {
  name: "RegistroEnfermero",

  data: function () {
    return {
      valid: true,
      error: "",
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
      verifyPassword: "",
      nivelesEducativos: [
        "Pregrado",
        "Postgrado",
        "Maestria",
        "Doctorado",
        "PostDoctorado",
      ],
      hospitales: [],
      fields: {
        username: "Correo Electronico",
        password: "Contraseña",
        first_name: "Nombres",
        last_name: "Apellidos",
        identification: "Numero de documento",
        education: "Nivel educativo",
        area: "Area",
        idHospital: "Hospital",
      },
    };
  },

  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      enfermero: {
        user: {
          username: { required, email },
          password: { required, regexPassword },
          first_name: { required, minLength: minLength(5) },
          last_name: { required, minLength: minLength(5) },
        },
        identification: { required, between: between(1000000, 9999999999) },
        education: { required },
        area: { required },
        idHospital: { required },
      },
    };
  },

  methods: {
    backLogin: function () {
      this.$router.push({ name: "login" });
    },

    errorCase: function () {
      switch (this.v$.$errors[0].$validator) {
        case "required":
          this.error = `El campo ${
            this.fields[this.v$.$errors[0].$property]
          } es requerido  `;
          break;
        case "email":
          this.error = "Ingresa un correo electronico valido";
          break;
        case "regexPassword":
          this.error = `La contraseña debe contener mínimo una mayúscula, una minúscula, un número y un caracter especial`;
          break;
        case "minLength":
          this.error = `El campo ${
            this.fields[this.v$.$errors[0].$property]
          } debe contener minimo 5 caracteres`;
          break;
        case "between":
          this.error = `El campo ${
            this.fields[this.v$.$errors[0].$property]
          } debe contener entre 7 y 10 dígitos`;
          break;
        default:
          break;
      }
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    },

    processSignUp: async function () {
      this.valid = await this.v$.$validate();
      if (!this.valid) {
        this.errorCase();
        return;
      }
      if (this.enfermero.user.password !== this.verifyPassword) {
        this.error = "Las contraseñas no coinciden";
        this.valid = false;
        return;
      }
      this.enfermero.user.email = this.enfermero.user.username;
      axios
        .post(this.store.state.backURL + "/enfermero/registro", this.enfermero)
        .then((result) => {
          alert("Registro Exitoso");
          this.backLogin();
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo en el registro.");
        });
    },

    getHospitales: function () {
      axios
        .get(this.store.state.backURL + "/hospital")
        .then((response) => {
          this.hospitales = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo al obtener hospitales");
        });
    },
  },

  created: function () {
    this.getHospitales();
  },
  setup() {
    const store = useStore();
    return { store};
  },
};
</script>
