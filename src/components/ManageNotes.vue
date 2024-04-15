<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/noteStore.js";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare as regularSquare } from "@fortawesome/free-regular-svg-icons";

const emit = defineEmits(["addNote", "all", "liked", "done"]);
const content = defineModel("content");
const title = defineModel("title", { required: true });

const addButtonRef = ref(null);

const store = useNoteStore();
const { hasNotes, hasLikedNotes, hasDoneNotes, isLoadingNotes } =
  storeToRefs(store);

const onAddNote = () => {
  emit("addNote");
};

const disabledClasses = computed(() => ({
  "tooltip-btn disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer":
    !content.value,
}));
</script>

<template>
  <div class="max-w-3xl max-h-screen rounded-md mx-auto mt-8 flex flex-col">
    <div
      class="grid grid-cols-2 px-4 mb-6 sm:grid-cols-2 md:grid-cols-3 rounded-md shadow-xl h-60"
    >
      <div class="w-80 flex flex-col place-self-center col-span-full">
        <input
          v-model="title"
          type="text"
          placeholder="Note title"
          class="input"
          maxlength="50"
        />
        <input
          @keyup.enter.prevent="onAddNote"
          v-model="content"
          type="text"
          placeholder="I need to..."
          class="input"
          maxlength="100"
        />
        <button
          @click.prevent="onAddNote"
          class="rounded-2xl bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 relative cursor-pointer"
          :class="disabledClasses"
          :disabled="!content"
          @mouseover="onMouseHover"
          @mouseleave="onMouseLeave"
          ref="addButtonRef"
        >
          <img
            v-if="isLoadingNotes"
            class="w-6 h-6 inline-block absolute left-2"
            src="../assets/spinners/spinner.gif"
            alt=""
          />
          Add Note
        </button>
        <div class="flex mt-4 gap-6">
          <button
            @click.prevent="$emit('all')"
            class="custom-filter-button bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300"
            :disabled="!hasNotes"
          >
            All
          </button>
          <button
            @click.prevent="$emit('done')"
            class="custom-filter-button bg-green-500 hover:bg-green-400 disabled:bg-green-300"
            :disabled="!hasNotes || (hasNotes && !hasDoneNotes)"
          >
            Done
            <font-awesome-icon
              :icon="regularSquare"
              @click.stop="$emit('toggleDone', note.id)"
              class="text-lg ml-2"
            />
          </button>
          <button
            @click.prevent="$emit('liked')"
            class="custom-filter-button bg-red-500 hover:bg-red-400 disabled:bg-red-300"
            :disabled="!hasNotes || (hasNotes && !hasLikedNotes)"
          >
            Liked
            <font-awesome-icon
              :icon="regularHeart"
              class="regular-heart ml-2"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
