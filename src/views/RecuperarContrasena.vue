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
              required
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
    import { MutationTypes, useStore } from '@/state';
    import { alert } from "../scripts/utils.js";

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
              this.store.state.backURL + "/reestablecer_contrasena/email",
              this.user
            )
            .then((result) => {
              if (result.data.exitoso) this.$router.push({ name: "login" });
              else alert("Ocurrió un error enviando el email de recuperación de contraseña", "danger");
            })
            .catch((error) => {
              console.log(error);
              alert("Ocurrió un error enviando el email de recuperación de contraseña", "danger");
            });
        },

        changePassword: function () {
          axios
            .put(
              this.store.state.backURL + "/reestablecer_contrasena/" + this.token,
              this.user
            )
            .then((result) => {
              if (result.data.exitoso) this.$router.push({ name: "login" });
              else alert("Ocurrió un error reestableciendo tu contraseña", "danger");
            })
            .catch((error) => {
              console.log(error);
              alert("Ocurrió un error reestableciendo tu contraseña", "danger");
            });
        },

        processChange: function () {
          if (this.token != null) {
            if (this.password == this.user.password) this.changePassword();
            else alert("La contraseña ingresada debe coincidir en ambos campos", "warning");
          } else this.sendMail();
        },

        validateToken: function () {
          axios
            .get(
              this.store.state.backURL + "/reestablecer_contrasena/" + this.token
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
        if (this.$route.params.hasOwnProperty("token")) {
          this.token = this.$route.params.token;
          this.validateToken();
        }
      },
      setup() {
        const store = useStore();
        return { store };
      },
    };
</script>
