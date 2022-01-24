<template>
  <div class="row justify-content-evenly">
    <p>{{ bienvenida }}</p>
    <div class="col col-md-6 col-sm-11">
      <donations />
    </div>
  </div>
</template>

<script>
import Donations from "@/components/Donations.vue";

export default {
  components: { Donations },
  name: "Home",

  data: function() {
    return {
      bienvenida: "Bienvenid@ a MedSource",
    };
  },

  created: function() {},
};
</script>

<style></style>
