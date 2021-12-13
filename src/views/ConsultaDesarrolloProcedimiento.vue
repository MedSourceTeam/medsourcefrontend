<template>
  <p>Procedimientos Desarrollados</p>
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
</template>

<script>
import axios from "axios";
export default {
  name: "ConsultaDesarrolloProcedimiento",
  data: function() {
    return {
      desarrollos: [],
    };
  },
  methods: {
    getProcedimientosDesarrollados(){
      axios
        .get(this.$store.state.backURL + "/mostrar_desarrollos/")
        .then((response) => {
            console.log(response.data);
          this.desarrollos = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("ERROR: Fallo al obtener desarrollos");
        });
    }
  },
  created: function() {
    this.getProcedimientosDesarrollados();
  },
};
</script>

<style></style>
