<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore.js";
import { storeToRefs } from "pinia";

const store = useAuthStore();
const { isLoggedIn } = storeToRefs(store);
console.log("is logged in", isLoggedIn.value);

const router = useRouter();
const logoutUser = () => {
  store.logout();
  router.push({ name: "login" });
  console.log("is logged in", isLoggedIn.value);
};
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
    <RouterLink
      v-if="!isLoggedIn"
      class="no-underline text-white text-lg"
      :to="{ name: 'login' }"
      >Login</RouterLink
    >
    <RouterLink
      v-if="!isLoggedIn"
      class="no-underline text-white text-lg"
      :to="{ name: 'register' }"
      >Register</RouterLink
    >
    <RouterLink
      v-if="isLoggedIn"
      @click="logoutUser"
      class="no-underline text-white text-lg"
      :to="{ name: 'login' }"
      >Logout</RouterLink
    >
  </div>
</template>

<style scoped>
.router-link-exact-active {
  border-bottom: white solid 1px;
  font-weight: bold;
}
</style>
