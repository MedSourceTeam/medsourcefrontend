<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Buscar Desarrollos de procedimientos</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">Nombre del paciente</label>
                    <input type="text" v-model="desarrollo.patient" />
                </div>
                <div class="form-group text-left">
                    <label for="">Identificacion del medico</label>
                    <input type="number" v-model="desarrollo.doctor" />
                </div>
                <div class="form-group text-left">
                    <label for="">Identificacion del enfermero</label>
                    <input type="number" v-model="desarrollo.nurse" />
                </div>
                <div class="form-group text-left">
                    <label for="">Nombre del procedimiento</label>
                    <input type="text" v-model="desarrollo.procedure" />
                </div>
                <div class="form-group text-left">
                    <label for="">Nombre del hospital</label>
                    <input type="text" v-model="desarrollo.hospital" />
                </div>
                <div class="form-group text-left">
                    <label for="">Fecha</label>
                    <input type="date" v-model="desarrollo.date" />
                </div>
                <div class="row ml-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                    <th>id</th>
                                    <th>Fecha</th>
                                    <th>Habitación</th>
                                    <th>Procedimiento</th>
                                    <th>Paciente</th>
                                    <th>Doctor</th>
                                    <th>Enfermera</th>
                                    <th>Comentario</th>
                                    <th>Hospital</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="desarrollo in desarrollos" :key="desarrollo.id" >
                                    <td>{{desarrollo.id}}</td>
                                    <td>{{desarrollo.date}}</td>
                                    <td>{{desarrollo.room}}</td>
                                    <td>{{desarrollo.procedure}}</td>
                                    <td>{{desarrollo.patient}}</td>
                                    <td>{{desarrollo.doctor}}</td>
                                    <td>{{desarrollo.nurse}}</td>
                                    <td>{{desarrollo.comment}}</td>
                                    <td>{{desarrollo.hospital}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="getProcedimientosDesarrollados">
                    Buscar desarrollos
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
      name: "BusquedaDesarrollo",
      data: function() {
        return {
            desarrollo: {
                procedure: "",
                patient: "",
                doctor: "",
                nurse: "",
                hospital: "",
                date: null,
            },
            desarrollos: [],
        };
      },
      methods: {
        goBackHome: function () {
            this.$router.push({ name: "home" });
        },
        getProcedimientosDesarrollados(){
            axios
                .get(this.$store.state.backURL + "/mostrar_desarrollos/", {
                        params: {
                            patient: this.desarrollo.patient,
                            doctor: this.desarrollo.doctor,
                            nurse: this.desarrollo.nurse,
                            procedure: this.desarrollo.procedure,
                            hospital: this.desarrollo.hospital,
                            date: this.desarrollo.date
                        }

                    })
                .then((response) => {
                    console.log(response.data);
                this.desarrollos = response.data;
                })
                .catch((error) => {
                console.log(error.response);
                alert("ERROR: Fallo al obtener desarrollos");
                });
            },
        }
    };
</script>