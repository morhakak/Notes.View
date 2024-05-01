<script setup>
import { RouterView, useRouter } from "vue-router";
import TheNavbar from "./components/UI/TheNavbar.vue";
import { useAuthStore } from "./stores/authStore.js";
import { onMounted } from "vue";
import TheFooter from "./components/UI/TheFooter.vue";

const store = useAuthStore();
const router = useRouter();

onMounted(() => {
  store.getTokenFromStorage();

  if (store.isLoggedIn) {
    router.push({ name: "home" });
  } else {
    router.push({ name: "login" });
  }
});
</script>

<template>
  <TheNavbar />
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <TheFooter />
</template>

<style scoped>
.slide-enter-from {
  opacity: 0;
  transform: translate(-60%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(60%);
}

.slide-enter-active {
  transition: all 0.4s ease-out;
}

.slide-leave-active {
  transition: all 0.4s ease-in;
}

/* .slide-enter-from {
  opacity: 0;
  transform: translate(-60%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(60%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
} */
</style>
