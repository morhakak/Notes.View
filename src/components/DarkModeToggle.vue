<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div>
    <button
      @click="toggleDark()"
      class="block px-2 mb-2 text-white hover:text-gray-200 sm:px-0 sm:mr-3 sm:mb-0"
    >
      <TransitionGroup name="icons" mode="ease">
        <font-awesome-icon
          v-if="isDark"
          :icon="['fas', 'sun']"
          class="text-white h-5 w-5"
        />
        <font-awesome-icon
          v-else
          :icon="['fas', 'moon']"
          class="text-white h-5 w-5"
        />
      </TransitionGroup>
    </button>
  </div>
</template>

<style scoped>
.icons-enter-active {
  transition: all 0.2s ease;
}
.icons-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}
.icons-enter-from,
.icons-leave-to {
  opacity: 0;
}
</style>
