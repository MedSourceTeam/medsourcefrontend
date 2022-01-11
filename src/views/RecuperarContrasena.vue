<template>
  <div class="container text-center mt-5">
    <div class="d-flex justify-content-center">
      <div class="col col-11 col-md-6">
        <h2 class="default-title">Recuperar contraseña</h2>
        <form v-on:submit.prevent="processChange">
          <div class="form-group text-left" v-if="token == null">
            <input
              class="form-control"
              placeholder="Correo Electrónico"
              type="email"
              v-model="user.email"
            />
          </div>
          <div class="form-group text-left" v-if="token != null">
            <label for="">Contraseña</label>
            <input type="password" v-model="user.password" />
          </div>
          <div class="form-group text-left" v-if="token != null">
            <label for="">Confirma tu contraseña</label>
            <input type="password" v-model="password" />
          </div>

          <button type="submit" class="btn btn-primary" v-if="token == null">
            Enviar correo de recuperación
          </button>
          <button type="submit" class="btn btn-primary" v-if="token != null">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecuperarContrasena",

  data: function () {
    return {
      user: {
        email: "",
        password: "",
      },
      password: "",
      token: null,
    };
  },

  methods: {
    sendMail: function () {
      axios
        .post(
          this.$store.state.backURL + "/reestablecer_contrasena/email",
          this.user
        )
        .then((result) => {
          if (result.data.exitoso) this.$router.push({ name: "login" });
          else alert("ERROR: Fallo en el envio del correo");
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el envio del correo");
        });
    },

    changePassword: function () {
      axios
        .put(
          this.$store.state.backURL + "/reestablecer_contrasena/" + this.token,
          this.user
        )
        .then((result) => {
          if (result.data.exitoso) this.$router.push({ name: "login" });
          else alert("ERROR: Fallo al actualizar la contraseña");
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo al actualizar la contraseña");
        });
    },

    processChange: function () {
      if (this.token != null) {
        if (this.password == this.user.password) this.changePassword();
        else alert("Las contraseñas no coinciden");
      } else this.sendMail();
    },

    validateToken: function () {
      axios
        .get(
          this.$store.state.backURL + "/reestablecer_contrasena/" + this.token
        )
        .then((result) => {
          if (!result.data.exitoso) this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ name: "login" });
        });
    },
  },

  created: function () {
    this.$store.commit("logout");
    if (this.$route.params.hasOwnProperty("token")) {
      this.token = this.$route.params.token;
      this.validateToken();
    }
  },
};
</script>
