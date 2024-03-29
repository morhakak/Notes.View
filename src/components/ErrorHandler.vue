<script setup>
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineProps(["errors"]);
</script>

<template>
  <div class="text-center">
    <p class="text-lg font-semibold italic inline-block">
      <FontAwesomeIcon :icon="faCircleXmark" class="text-red-500" />
      Error while loading notes:
    </p>
    <p v-for="error in errors" :key="error.message" class="inline-block ml-2">
      {{ error }}
    </p>
  </div>
</template>
