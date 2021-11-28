<template>
  <p>{{ bienvenida }}</p>
</template>

<script>
import { renewToken } from "@/services/token";
export default {
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
