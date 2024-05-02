<script setup>
import { RouterView, useRouter } from "vue-router";
import { useAuthStore } from "./stores/authStore.js";
import { onMounted } from "vue";
import LayoutComponent from "./components/UI/LayoutComponent.vue";

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
  <LayoutComponent>
    <RouterView v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </LayoutComponent>
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
</style>
