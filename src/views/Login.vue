<template>
  <div class="container text-center">
  <div class="col col-8 col-md-0">
  a
  </div>
    <div class="col col-4 col-md-12">
      <h2 class="default-title h1">Iniciar Sesión</h2>
      <form v-on:submit.prevent="processLogin">
        <div class="form-group">
          <input placeholder="Correo Electrónico" type="email" v-model="user.username" />
        </div>
        <div class="form-group">
          <input type="password" v-model="user.password" placeholder="Contraseña" />
        </div>
        <button type="submit" class="btn btn-primary">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setAuthenticationToken, setRefreshToken } from "@/services/token";

export default {
  name: "Login",

  data: function() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    processLogin: function() {
      console.log(this.$store.state.backURL);
      axios
        .post(this.$store.state.backURL + "/login", this.user)
        .then((result) => {
          setAuthenticationToken(result.data.access);
          setRefreshToken(result.data.refresh);
          this.$store.commit("login");
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el login.");
        });
    },
  },

  created: function() {},
};
</script>
