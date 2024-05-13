<template>
  <div
    class="flex items-center justify-around h-20 w-[400px] sm:w-[500px] shadow-md hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
  >
    <div class="flex items-center">
      <font-awesome-icon
        :icon="['fas', 'circle-user']"
        class="text-xl text-gray-500 dark:text-blue-100 mr-2"
      />
      <p class="w-36 truncate">{{ user.email }}</p>
    </div>
    <div class="flex items-center">
      <p class="w-36 truncate">{{ user.roles.join(",") }}</p>
      <font-awesome-icon
        @click="$emit('deleteUser', user.id)"
        :icon="['fas', 'trash-can']"
        class="text-xl text-gray-500 dark:text-blue-100 ml-2"
      />
    </div>
  </div>
</template>

<script setup>
defineProps(["user"]);
</script>

<style scoped></style>
