<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Buscar enfermeros</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">Identificacion</label>
                    <input type="number" v-model="nurse.identification" />
                </div>
                <div class="form-group text-left">
                    <label for="">Area</label>
                    <input type="text" v-model="nurse.area" />
                </div>
                <div class="form-group text-left">
                    <label for="">Hospital</label>
                    <input type="text" v-model="nurse.hospital" />
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
                                    <th>Area</th>
                                    <th>Hospital</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="nurse in nurses" :key="nurse.id" >
                                    <td>{{nurse.id}}</td>
                                    <td>{{nurse.identification}}</td>
                                    <td>{{nurse.full_name}}</td>
                                    <td>{{nurse.area}}</td>
                                    <td>{{nurse.hospital}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="getEnfermeros">
                    Buscar enfermeros
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
            nurse: {
                identification: null,
                area: "",
                hospital: ""
            },
            nurses: [],
        };
      },
      methods: {
        goBackHome: function () {
            this.$router.push({ name: "home" });
        },
        getEnfermeros(){
            axios
                .get(this.$store.state.backURL + "/mostrar_enfermeros/", {
                        params: {
                            identification: this.nurse.identification,
                            area: this.nurse.area,
                            hospital: this.nurse.hospital
                        }

                    })
                .then((response) => {
                    console.log(response.data);
                this.nurses = response.data;
                })
                .catch((error) => {
                console.log(error.response);
                alert("ERROR: Fallo al obtener enfermeros");
                });
            },
        }
    };
</script>