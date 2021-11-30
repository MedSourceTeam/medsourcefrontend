<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Registrar Procedimiento</h2>
            <form v-on:submit.prevent="processSignUp">
                
                <div class="form-group text-left">
                    <label for="">Nombre del Procedimiento</label>
                    <input type="text" v-model="procedure.name" />
                </div>

                <div class="form-group text-left">
                    <label for="">Unidad de Valor Relativa</label>
                    <input type="number" v-model="procedure.uvr" />
                </div>

                <button type="submit" class="btn btn-primary">Registrar Procedimiento</button>
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
  name: "RegistroProcedimiento",
  data: function() {
    return {
        procedure: {
            name: "",
            uvr: null,
        }
    };
  },
  methods: {
    goBackHome: function() {
      //TODO: cambiar cuando exista login
      this.$router.push({ name: "home" });
    },
    processSignUp: function() {
      axios
        .post(this.$store.state.backURL + "/procedimiento/ingreso", this.procedure)
        .then((result) => {
          alert("Procedimiento Registrado con �xito");
          this.goBackHome();
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo durante el registro del procedimiento");
        });
    },
  },
};
</script>