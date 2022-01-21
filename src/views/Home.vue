<template>
  <p>{{ bienvenida }}</p>
  <donations />
</template>

<script>
import { renewToken } from "@/services/login";
import Donations from "@/components/Donations.vue";

export default {
  components: { Donations },
  name: "Home",

  data: function() {
    return {
      bienvenida: "Bienvenid@ a MedSource",
    };
  },

  created: function() {
    renewToken();
  },
};
</script>

<style></style>
