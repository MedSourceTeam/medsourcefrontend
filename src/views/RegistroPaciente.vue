<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Registrar Paciente</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">N�mero de Identificaci�n</label>
                    <input type="number" v-model="patient.identification" />
                </div>
                <div class="form-group text-left">
                    <label for="">Nombre Completo</label>
                    <input type="text" v-model="patient.full_name" />
                </div>
                <div class="form-group text-left">
                    <label for="">Fecha de Nacimiento</label>
                    <input type="date" v-model="patient.date_of_birth" />
                </div>
                <div class="form-group text-left">
                    <label for="">N�mero de Tel�fono</label>
                    <input type="number" v-model="patient.phone" />
                </div>
                <div class="form-group text-left">
                    <label for="">Estado Civil</label>
                    <select v-model="patient.marital_status">
                        <option disabled value="">Seleccione un Estado Civil</option>
                        <option v-for="maritalStatus in maritalStatusArray" :key="maritalStatus">
                            {{
                                maritalStatus
                            }}
                        </option>
                    </select>
                </div>
                <div class="form-group text-left">
                    <label for="">Grupo Sangu�neo</label>
                    <select v-model="patient.marital_status">
                        <option disabled value="">Seleccione un Grupo Sangu�neo</option>
                        <option v-for="bloodType in bloodTypesArray" :key="bloodType">
                            {{
                                bloodType
                            }}
                        </option>
                    </select>
                </div>
                <div class="form-group text-left">
                    <label for="">EPS</label>
                    <select v-model="patient.eps">
                        <option disabled value="">Seleccione una EPS</option>
                        <option v-for="eps in EPSs"
                                :key="eps"
                                :value="eps.id">
                            {{ eps.name }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Registrar Paciente</button>
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
  name: "RegistroPaciente",
  data: function() {
    return {
        patient: {
            identification: null,
            full_name: "",
            date_of_birth: null,
            phone: null,
            idHospital: null,
        },
        maritalStatusArray: [
            "Soltero",
            "Casado",
            "Uni�n Libre",
            "Viudo",
            "Divorciado",
        ],
        bloodTypesArray: [
            "A+",
            "A-",
            "AB+",
            "AB-",
            "B+",
            "B-",
            "O+",
            "O-"
        ],
        EPSs: [],
    };
  },
  methods: {
    goBackHome: function() {
      //TODO: cambiar cuando exista login
      this.$router.push({ name: "home" });
    },
    processSignUp: function() {
      axios
        .post(this.$store.state.backURL + "/paciente/ingreso", this.patient)
        .then((result) => {
          alert("Paciente Registrado con �xito");
          this.goBackHome();
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo durante el registro del paciente");
        });
    },

    getEPSs: function() {
      axios
        .get(this.$store.state.backURL + "/eps")
        .then((response) => {
          this.EPSs = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo al obtener las EPSs");
        });
    },
  },
  created: function() {
    this.getEPSs();
  },
};
</script>