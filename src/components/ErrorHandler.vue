<script setup>
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineProps(["errors"]);
</script>

<template>
  <div class="text-center">
    <p class="text-lg font-semibold inline-block dark:text-white">
      <FontAwesomeIcon :icon="faCircleXmark" class="text-red-500" />
      Error while loading notes:
    </p>
    <p
      v-for="error in errors"
      :key="error.message"
      class="inline-block ml-2 italic dark:text-white"
    >
      {{ error }}
    </p>
  </div>
</template>
