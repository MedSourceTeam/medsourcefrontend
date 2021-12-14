<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Buscar procedimientos</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">Nombre del procedimiento</label>
                    <input type="text" v-model="procedure.name" />
                </div>
                <div class="form-group text-left">
                    <label for="">Numero de uvr minimo</label>
                    <input type="number" v-model="procedure.uvr" />
                </div>
                <div class="row ml-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                    <th>id</th>
                                    <th>Nombre</th>
                                    <th>UVR</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="procedure in procedures" :key="procedure.id" >
                                    <td>{{procedure.id}}</td>
                                    <td>{{procedure.name}}</td>
                                    <td>{{procedure.uvr}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="getProcedimientos">
                    Buscar procedimientos
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
      name: "BusquedaProcedimiento",
      data: function() {
        return {
            procedure: {
                name: "",
                uvr: null
            },
            procedures: [],
        };
      },
      methods: {
        goBackHome: function () {
            this.$router.push({ name: "home" });
        },
        getProcedimientos(){
            axios
                .get(this.$store.state.backURL + "/procedimientos/", {
                        params: {
                            name: this.procedure.name,
                            uvr: this.procedure.uvr
                        }

                    })
                .then((response) => {
                    console.log(response.data);
                this.procedures = response.data;
                })
                .catch((error) => {
                console.log(error.response);
                alert("ERROR: Fallo al obtener desarrollos");
                });
            },
        }
    };
</script>