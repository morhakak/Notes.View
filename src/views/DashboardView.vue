<template>
  <div
    class="flex flex-col md:flex-row w-full min-h-[70vh] justify-center items-center gap-10 py-6 px-4 dark:text-white"
  >
    <div
      @click="goTo('users')"
      class="p-4 h-40 w-40 flex flex-col justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
    >
      <font-awesome-icon
        :icon="['fas', 'users']"
        class="text-5xl mb-10 absolute text-gray-500 dark:text-blue-100"
      />
      <p class="mt-14 text-lg">Manage Users</p>
    </div>
    <div
      @click="goTo('home')"
      class="p-4 h-40 w-40 flex justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
    >
      <font-awesome-icon
        :icon="['fas', 'note-sticky']"
        class="text-5xl mb-10 absolute text-gray-500 dark:text-blue-100"
      />
      <p class="mt-14 text-lg">Manage Notes</p>
    </div>
    <div
      @click="goTo('stats')"
      class="p-4 h-40 w-40 flex justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
    >
      <font-awesome-icon
        :icon="['fas', 'chart-pie']"
        class="text-5xl mb-10 absolute text-gray-500 dark:text-blue-100"
      />
      <p class="mt-14 text-lg">Statistics</p>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";

const router = useRouter();

function goTo(pathName) {
  router.push({ name: `${pathName}` });
}
</script>

<style scoped></style>
