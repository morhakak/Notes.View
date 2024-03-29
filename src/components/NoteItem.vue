<script setup>
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare as solidSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare as regularSquare } from "@fortawesome/free-regular-svg-icons";

defineProps({
  note: Object,
});

defineEmits(["toggleLiked", "removeNote", "toggleDone"]);
</script>

<template>
  <div
    @click="$emit('toggleDone', note.id)"
    class="w-full flex justify-between h-30 p-6 items-center shadow-md mb-10"
  >
    <div class="flex flex-col gap-4">
      <p class="text-xl font-semibold" :class="{ 'line-through': note.isDone }">
        {{ note.title }}
      </p>
      <p class="text-md" :class="{ 'line-through': note.isDone }">
        {{ note.content }}
      </p>
      <p class="text-xs text-gray-500 italic">{{ note.createdAt }}</p>
    </div>

    <div class="flex gap-2">
      <button v-if="note.isDone">
        <font-awesome-icon
          :icon="solidSquare"
          @click.stop="$emit('toggleDone', note.id)"
          class="text-green-500 text-lg"
        />
      </button>
      <button v-if="!note.isDone">
        <font-awesome-icon
          :icon="regularSquare"
          @click.stop="$emit('toggleDone', note.id)"
          class="text-lg"
        />
      </button>
      <button v-if="note.isLiked" @click.stop="$emit('toggleLiked', note.id)">
        <font-awesome-icon :icon="solidHeart" class="text-red-500 text-lg" />
      </button>
      <button v-if="!note.isLiked" @click.stop="$emit('toggleLiked', note.id)">
        <font-awesome-icon :icon="regularHeart" class="text-lg" />
      </button>
      <button
        @click.stop="$emit('removeNote', note.id)"
        class="bg-blue-500 text-white w-18 py-1 px-2 ml-4 rounded-md hover:bg-blue-300"
      >
        Remove
      </button>
    </div>
  </div>
</template>
