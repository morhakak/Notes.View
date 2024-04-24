<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore.js";
import { storeToRefs } from "pinia";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

const store = useAuthStore();
const { isLoggedIn, userName } = storeToRefs(store);

const router = useRouter();
const logoutUser = () => {
  store.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <div
    class="flex w-full h-20 shadow-lg bg-blue-500 items-center justify-between"
  >
    <p class="text-white text-3xl ml-4">
      <font-awesome-icon :icon="faNoteSticky" class="text-white" /> Notes
    </p>
    <div class="flex gap-4">
      <RouterLink
        v-if="isLoggedIn"
        class="no-underline text-white text-lg"
        :to="{ name: 'home' }"
        >My Notes</RouterLink
      >
      <RouterLink
        class="no-underline text-white text-lg"
        :to="{ name: 'about' }"
        >About</RouterLink
      >
    </div>
    <div class="flex gap-6 mr-4">
      <p v-if="isLoggedIn && userName" class="text-white text-md">
        <font-awesome-icon :icon="faUser" class="text-white" /> Hi
        {{ userName }}
      </p>
      <div class="flex gap-2">
        <RouterLink
          v-if="!isLoggedIn"
          class="no-underline text-white text-md"
          :to="{ name: 'login' }"
          >Login</RouterLink
        >
        <span v-if="!isLoggedIn" class="text-white text-md">/</span>
        <RouterLink
          v-if="!isLoggedIn"
          class="no-underline text-white text-md"
          :to="{ name: 'register' }"
          >Register</RouterLink
        >
      </div>
      <RouterLink
        v-if="isLoggedIn"
        @click="logoutUser"
        class="no-underline text-white text-md"
        :to="{ name: 'login' }"
      >
        <font-awesome-icon :icon="faDoorOpen" class="text-white" />
        Log Out
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  border-bottom: white solid 1px;
  font-weight: bold;
}
</style>
