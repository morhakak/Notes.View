<script setup>
defineProps({
  note: Object,
});

defineEmits(["toggleLiked", "removeNote", "toggleDone"]);
</script>

<template>
  <div @click="$emit('toggleDone', note.id)" class="note-item">
    <div class="flex flex-col gap-2 h-full w-full">
      <p
        class="text-lg font-semibold break-keep"
        :class="{ 'line-through': note.isDone }"
      >
        {{ note.title }}
      </p>
      <p
        class="text-sm flex-grow break-keep"
        :class="{ 'line-through': note.isDone }"
      >
        {{ note.content }}
      </p>
      <div class="flex gap-6 sm:w-full sm:justify-between">
        <p class="text-gray-500 text-xxs italic dark:text-gray-200">
          {{ note.createdAt }}
        </p>
        <div class="flex self-end gap-2">
          <font-awesome-icon
            v-if="note.isDone"
            :icon="['fas', 'square-check']"
            @click.stop="$emit('toggleDone', note.id)"
            class="text-green-500 action-icon"
          />
          <font-awesome-icon
            v-if="!note.isDone"
            :icon="['far', 'square-check']"
            @click.stop="$emit('toggleDone', note.id)"
            class="action-icon"
          />
          <font-awesome-icon
            v-if="note.isLiked"
            @click.stop="$emit('toggleLiked', note.id)"
            :icon="['fas', 'heart']"
            class="text-red-500 action-icon"
          />
          <font-awesome-icon
            v-if="!note.isLiked"
            @click.stop="$emit('toggleLiked', note.id)"
            :icon="['far', 'heart']"
            class="action-icon"
          />
          <font-awesome-icon
            @click.stop="$emit('removeNote', note.id)"
            :icon="['far', 'trash-can']"
            class="action-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
</style>
