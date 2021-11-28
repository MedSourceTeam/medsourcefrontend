<template>
  <div class="container text-center">
    <div class="col col-11 col-md-6">
      <h2>Login</h2>
      <form v-on:submit.prevent="processLogin">
        <div class="form-group text-left">
          <label for="">Correo Electronico</label>
          <input type="email" v-model="user.username" />
        </div>
        <div class="form-group text-left">
          <label for="">Contraseña</label>
          <input type="password" v-model="user.password" />
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
