<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Registrar Antecedente</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">Nombre</label>
                    <input type="text" v-model="record.name" />
                </div>
                <div class="form-group text-left">
                    <label for="">Clase</label>
                    <select v-model="record.kind">
                        <option disabled value="">Seleccione una clase</option>
                        <option v-for="kind in kindsArray" :key="kind">
                            {{
                                kind
                            }}
                        </option>
                    </select>
                </div>
                <div class="form-group text-left">
                    <label for="">Tipo</label>
                    <input type="text" v-model="record.sort" />
                </div>
                <button type="submit" class="btn btn-primary">Registrar Antecedente</button>
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
  name: "RegistroAntecedente",
  data: function() {
    return {
        record: {
            name: "",
            sort: "",
        },
        kindsArray: [
            "Personal",
            "Gineco-Obstetricos",
            "Psicosociales",
            "Familiares",
        ],
    };
  },
  methods: {
    goBackHome: function() {
      //TODO: cambiar cuando exista login
      this.$router.push({ name: "home" });
    },
    processSignUp: function() {
      axios
        .post(this.$store.state.backURL + "/antecedente/ingreso", this.record)
        .then((result) => {
          alert("Antecedente Registrado con �xito");
          this.goBackHome();
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo durante el registro del antecedente");
        });
    },
  },
};
</script>