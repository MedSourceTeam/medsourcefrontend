<template>
    <div class="container text-center">
        <div class="col col-11 col-md-6">
            <h2>Buscar consultas</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="form-group text-left">
                    <label for="">Nombre del paciente</label>
                    <input type="text" v-model="consultation.patient" />
                </div>
                <div class="form-group text-left">
                    <label for="">Identificacion del medico</label>
                    <input type="number" v-model="consultation.doctor" />
                </div>
                <div class="form-group text-left">
                    <label for="">Nombre del hospital</label>
                    <input type="text" v-model="consultation.hospital" />
                </div>
                <div class="row ml-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                        <th>id</th>
                                        <th>Paciente</th>
                                        <th>Medico</th>
                                        <th>Hospital</th>
                                        <th>Pulso</th>
                                        <th>Altura</th>
                                        <th>Peso</th>
                                        <th>Pa</th>
                                        <th>Pr</th>
                                        <th>T</th>
                                        <th>Medicacion</th>
                                        <th>Sintomas</th>
                                        <th>Diagnostico</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="consultation in consultations" :key="consultations.id">
                                            <tr>
                                                <td>
                                                    {{ consultation.id }}
                                                </td>
                                                <td>
                                                    {{ consultation.patient }}
                                                </td>
                                                <td>
                                                    {{ consultation.doctor }}
                                                </td>
                                                <td>
                                                    {{ consultation.hospital }}
                                                </td>
                                                <td>
                                                    {{ consultation.pulse }}
                                                </td>
                                                <td>
                                                    {{ consultation.height }}
                                                </td>
                                                <td>
                                                    {{ consultation.weight }}
                                                </td>
                                                <td>
                                                    {{ consultation.pa }}
                                                </td>
                                                <td>
                                                    {{ consultation.pr }}
                                                </td>
                                                <td>
                                                    {{ consultation.t }}
                                                </td>
                                                <td>
                                                    {{ consultation.medication }}
                                                </td>
                                                <td>
                                                    {{ consultation.symptom }}
                                                </td>
                                                <td>
                                                    {{ consultation.diagnosis }}
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="searchConsultation">
                    Buscar Consultas
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
      name: "BusquedaConsulta",
      data: function() {
        return {
            consultation: {
                patient: "",
                doctor: null,
                hospital: "",
            },
            consultations: [],
        };
      },
      methods: {
        goBackHome: function () {
            this.$router.push({ name: "home" });
        },
        searchConsultation: function () {
            axios
                .get(this.$store.state.backURL + "/mostrar_consultas/", {
                        params: {
                            patient: this.consultation.patient,
                            doctor: this.consultation.doctor,
                            hospital: this.consultation.hospital,
                        }
                    })
                .then((response) => {
                    this.consultations = response.data
                })
                .catch((error) => {
                    if (error.response.status == 404)
                        alert(
                            "No se encontraron resultados"
                        );
                    else alert("Ocurrió un error buscando las consultas");
                });
            },
        },
    };
</script>