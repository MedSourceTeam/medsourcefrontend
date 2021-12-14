<template>
  <div class="border border-1 border-primary ">
    <div class="row border-primary border-5">
      <div class="col-6   ">
        <h4>Antecedente</h4>
        <p>{{ antecedente.record_name }}</p>
        <h4>Calse de antecedente</h4>
        <p>{{ antecedente.record_kind }}</p>
        <h4>Tipo de antecedente</h4>
        <p>{{ antecedente.record_sort }}</p>
      </div>
      <div class="col-6">
        <h4>Paciente</h4>
        <p>{{ antecedente.patient_name }}</p>
        <h4>Identificación del paciente</h4>
        <p>{{ antecedente.patient_identification }}</p>
      </div>
    </div>
  </div>
  <div class="m-5"></div>
</template>

<script>
export default {
  name: "AntecedenteListItem",

  props: {
    antecedente: Object,
  },
};
</script>

<style></style>
