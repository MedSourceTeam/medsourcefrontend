<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Buscar medicos</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">Identificacion</label>
                    <input type="number" v-model="doctor.identification" />
                </div>
                <div class="form-group text-left">
                    <label for="">Especializacion</label>
                    <input type="text" v-model="doctor.specialization" />
                </div>
                <div class="form-group text-left">
                    <label for="">Hospital</label>
                    <input type="text" v-model="doctor.hospital" />
                </div>
                <div class="row ml-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                    <th>id</th>
                                    <th>Identificacion</th>
                                    <th>Nombre completo</th>
                                    <th>Especializacion</th>
                                    <th>Hospital</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="doctor in doctors" :key="doctor.id" >
                                    <td>{{doctor.id}}</td>
                                    <td>{{doctor.identification}}</td>
                                    <td>{{doctor.full_name}}</td>
                                    <td>{{doctor.specialization}}</td>
                                    <td>{{doctor.hospital}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="getMedicos">
                    Buscar medicos
                </button>
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
      name: "BusquedaMedico",
      data: function() {
        return {
            doctor: {
                identification: null,
                specialization: "",
                hospital: ""
            },
            doctors: [],
        };
      },
      methods: {
        goBackHome: function () {
            this.$router.push({ name: "home" });
        },
        getMedicos(){
            axios
                .get(this.$store.state.backURL + "/mostrar_medicos/", {
                        params: {
                            identification: this.doctor.identification,
                            specialization: this.doctor.specialization,
                            hospital: this.doctor.hospital
                        }

                    })
                .then((response) => {
                    console.log(response.data);
                this.doctors = response.data;
                })
                .catch((error) => {
                console.log(error.response);
                alert("ERROR: Fallo al obtener medicos");
                });
            },
        }
    };
</script>