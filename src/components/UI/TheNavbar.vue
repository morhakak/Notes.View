<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="flex w-full items-center justify-center gap-6 h-20 shasow-md bg-blue-500"
  >
    <RouterLink class="no-underline text-white text-lg" :to="{ name: 'home' }"
      >Notes</RouterLink
    >
    <RouterLink class="no-underline text-white text-lg" :to="{ name: 'about' }"
      >About</RouterLink
    >
  </div>
</template>

<style scoped>
.router-link-exact-active {
  border-bottom: white solid 1px;
  font-weight: bold;
}
</style>
