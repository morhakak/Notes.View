<script setup>
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare as solidSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare as regularSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

defineProps({
  note: Object,
});

defineEmits(["toggleLiked", "removeNote", "toggleDone"]);
</script>

<template>
  <div
    @click="$emit('toggleDone', note.id)"
    class="w-60 flex justify-between h-60 p-4 items-center shadow-md mb-10"
  >
    <div class="flex flex-col gap-2 h-full">
      <p
        class="text-lg font-semibold break-all"
        :class="{ 'line-through': note.isDone }"
      >
        {{ note.title }}
      </p>
      <p
        class="text-sm flex-grow break-all"
        :class="{ 'line-through': note.isDone }"
      >
        {{ note.content }}
      </p>
      <div class="flex gap-6">
        <p class="text-xs text-gray-500 italic">{{ note.createdAt }}</p>
        <div class="flex self-end gap-2">
          <font-awesome-icon
            v-if="note.isDone"
            :icon="solidSquare"
            @click.stop="$emit('toggleDone', note.id)"
            class="text-green-500 text-lg hover:shadow-lg hover:cursor-pointer"
          />
          <font-awesome-icon
            v-if="!note.isDone"
            :icon="regularSquare"
            @click.stop="$emit('toggleDone', note.id)"
            class="text-lg hover:shadow-lg hover:cursor-pointer"
          />
          <font-awesome-icon
            v-if="note.isLiked"
            @click.stop="$emit('toggleLiked', note.id)"
            :icon="solidHeart"
            class="text-red-500 text-lg hover:shadow-lg hover:cursor-pointer"
          />
          <font-awesome-icon
            v-if="!note.isLiked"
            @click.stop="$emit('toggleLiked', note.id)"
            :icon="regularHeart"
            class="text-lg hover:shadow-lg hover:cursor-pointer"
          />
          <font-awesome-icon
            @click.stop="$emit('removeNote', note.id)"
            :icon="faTrashCan"
            class="text-lg hover:shadow-lg hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>
