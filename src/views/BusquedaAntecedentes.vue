<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Buscar antecedentes</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">Nombre del antecedente</label>
                    <input type="text" v-model="record.name" />
                </div>
                <div class="form-group text-left">
                    <label for="">Clase de antecedente</label>
                    <input type="text" v-model="record.kind" />
                </div>
                <div class="form-group text-left">
                    <label for="">Tipo de antecedente</label>
                    <input type="text" v-model="record.sort" />
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
                                    <th>Clase</th>
                                    <th>Tipo</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="record in records" :key="record.id" >
                                    <td>{{record.id}}</td>
                                    <td>{{record.name}}</td>
                                    <td>{{record.kind}}</td>
                                    <td>{{record.sort}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="getAntecedentes">
                    Buscar antecedentes
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
      name: "BusquedaAntecedente",
      data: function() {
        return {
            record: {
                name: "",
                kind: "",
                sort: ""
            },
            records: [],
        };
      },
      methods: {
        goBackHome: function () {
            this.$router.push({ name: "home" });
        },
        getAntecedentes(){
            axios
                .get(this.$store.state.backURL + "/antecedentes", {
                        params: {
                            name: this.record.name,
                            kind: this.record.kind,
                            sort: this.record.sort
                        }

                    })
                .then((response) => {
                    console.log(response.data);
                this.records = response.data;
                })
                .catch((error) => {
                console.log(error.response);
                alert("ERROR: Fallo al obtener antecedentes");
                });
            },
        }
    };
</script>