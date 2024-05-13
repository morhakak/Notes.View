<template>
  <div
    class="flex flex-col w-full min-h-[70vh] justify-center items-center gap-14 py-6 px-4 dark:text-white"
  >
    <h1 class="text-3xl">Stats</h1>
    <div class="flex flex-col sm:flex-row gap-10">
      <div
        class="p-4 h-40 w-40 flex flex-col justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
      >
        <p class="text-lg">Total Notes:</p>
        <div class="flex justify-center items-center gap-2 mt-10 text-xl">
          <p>{{ numOfNotes }}</p>
          <font-awesome-icon
            :icon="['fas', 'note-sticky']"
            class="action-icon text-blue-500"
          />
        </div>
      </div>
      <div
        class="p-4 h-40 w-40 flex flex-col justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
      >
        <p class="text-lg">Liked Notes:</p>
        <div class="flex justify-center items-center gap-2 mt-10 text-xl">
          <p>{{ numOfLikedNotes }}</p>
          <font-awesome-icon
            :icon="['fas', 'heart']"
            class="action-icon text-red-500"
          />
        </div>
      </div>
      <div
        class="p-4 h-40 w-40 flex flex-col justify-center items-center shadow-lg hover:cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-blue-950 dark:text-white dark:shadow-slate-800 rounded-md"
      >
        <p class="text-lg">Done Notes:</p>
        <div class="flex justify-center items-center gap-2 mt-10 text-xl">
          <p>{{ numOfDoneNotes }}</p>
          <font-awesome-icon
            :icon="['fas', 'square-check']"
            class="action-icon text-green-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNoteStore } from "@/stores/noteStore";
import { storeToRefs } from "pinia";

const { numOfNotes, numOfLikedNotes, numOfDoneNotes } = storeToRefs(
  useNoteStore()
);
</script>

<style scoped></style>
