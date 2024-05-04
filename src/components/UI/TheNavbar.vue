<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DarkModeToggle from "../DarkModeToggle.vue";

const store = useAuthStore();
const { isLoggedIn, userName } = storeToRefs(store);
const router = useRouter();
const isOpen = ref(false);

const logoutUser = () => {
  store.logout();
  router.push({ name: "login" });
};

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <header
    class="bg-blue-500 relative sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 shadow-slate-400 shadow-lg dark:bg-blue-950 dark:shadow-slate-700"
  >
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
      <h1 class="text-white text-2xl">
        <font-awesome-icon :icon="['fas', 'note-sticky']" class="text-white" />
        Notes
      </h1>
      <div class="sm:hidden">
        <button
          @click="toggleMenu"
          type="button"
          class="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
        >
          <TransitionGroup name="icons">
            <font-awesome-icon
              v-if="isOpen"
              :icon="['fas', 'x']"
              class="text-white h-5 w-5"
            />
            <font-awesome-icon
              v-else
              :icon="['fas', 'bars']"
              class="text-white h-5 w-5"
            />
          </TransitionGroup>
        </button>
      </div>
    </div>
    <nav
      class="px-4 pt-2 pb-4 sm:flex sm:p-0 sm:static sm:top-0 sm:shadow-none dark:bg-blue-950 dark:shadow-slate-700"
      :class="
        isOpen
          ? [
              'block',
              'absolute',
              'top-18',
              'bg-blue-500',
              'z-10',
              'w-full',
              'sm:w-auto',
              ' shadow-slate-400 shadow-lg',
            ]
          : 'hidden'
      "
    >
      <DarkModeToggle />
      <p
        v-if="isLoggedIn && userName"
        class="block px-2 mb-2 text-white rounded sm:px-0 sm:mr-3 sm:mb-0"
      >
        <font-awesome-icon :icon="['fas', 'user']" class="text-white" /> Hello,
        <span class="font-semibold">{{ userName }}</span>
        <span class="hidden sm:inline-block"> &nbsp; &nbsp;|</span>
      </p>
      <RouterLink
        v-if="isLoggedIn"
        class="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
        :to="{ name: 'home' }"
        >My Notes</RouterLink
      >
      <RouterLink
        class="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
        :to="{ name: 'about' }"
        >About</RouterLink
      >
      <RouterLink
        v-if="!isLoggedIn"
        class="block px-2 mb-2 text-md text-white hover:text-gray-200 sm:px-0 sm:mb-0"
        :to="{ name: 'login' }"
        >Login</RouterLink
      >
      <span
        v-if="!isLoggedIn"
        class="text-white hidden text-xs px-2 py-1 sm:block sm:mb-0 sm:"
        >/</span
      >
      <RouterLink
        v-if="!isLoggedIn"
        class="block px-2 mb-2 text-md text-white hover:text-gray-200 sm:px-0 sm:mb-0"
        :to="{ name: 'register' }"
        >Register</RouterLink
      >
      <RouterLink
        v-if="isLoggedIn"
        @click="logoutUser"
        class="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mb-0"
        :to="{ name: 'login' }"
      >
        <font-awesome-icon :icon="['fas', 'door-open']" class="text-white" />
        Log Out
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
  border-left: none;
  border-bottom: solid white 2px;
}

@media (max-width: 640px) {
  .router-link-exact-active {
    font-weight: bold;
    border-bottom: none;
    border-left: solid 4px white;
    margin-left: -4px;
    height: 20%;
  }
}

.icons-enter-active {
  transition: all 0.3s ease;
}
.icons-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}
.icons-enter-from,
.icons-leave-to {
  opacity: 0;
}
</style>
