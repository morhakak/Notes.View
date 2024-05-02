<script setup>
import TheFooter from "./TheFooter.vue";
import TheNavbar from "./TheNavbar.vue";
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <TheNavbar />
    <main class="p-4 flex-grow">
      <slot></slot>
    </main>
    <TheFooter />
  </div>
</template>
