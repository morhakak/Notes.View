<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/noteStore.js";
import {
  faHeart as regularHeart,
  faCheckSquare as regularSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["addNote", "all", "liked", "done"]);
const content = defineModel("content");
const title = defineModel("title", { required: true });

const addButtonRef = ref(null);
const doneButtonRef = ref(null);

const store = useNoteStore();
const { hasNotes, hasLikedNotes, hasDoneNotes, isLoadingNotes, filterOption } =
  storeToRefs(store);

watch([filterOption, hasDoneNotes], ([newFilterOpt, newHasDoneNotes]) => {
  if (newFilterOpt === "done" && newHasDoneNotes === false) {
    emit("all");
  }
});

watch([filterOption, hasLikedNotes], ([newFilterOpt, newhasLikedNotes]) => {
  if (newFilterOpt === "liked" && newhasLikedNotes === false) {
    emit("all");
  }
});

const onAddNote = () => {
  emit("addNote");
};

const disabledClasses = computed(() => ({
  "disabled:bg-blue-300 disabled:cursor-not-allowed ": !title.value,
}));
</script>

<template>
  <div class="max-w-3xl rounded-md mx-auto mt-8 flex flex-col">
    <div
      class="items-center mx-4 grid grid-cols-2 p-4 px-4 mb-6 sm:grid-cols-2 md:grid-cols-3 rounded-md shadow-lg h-60 shadow-slate-400 dark:bg-blue-950 dark:shadow-slate-700"
    >
      <div class="w-80 flex flex-col place-self-center col-span-full">
        <input
          @keyup.enter.prevent="onAddNote"
          v-model="title"
          type="text"
          placeholder="Note title"
          class="input border-b-2 dark:bg-blue-950 dark:text-white"
          maxlength="50"
        />
        <input
          @keyup.enter.prevent="onAddNote"
          v-model="content"
          type="text"
          placeholder="I need to..."
          class="input border-b-2 dark:bg-blue-950 dark:text-white"
          maxlength="100"
        />
        <button
          @click.prevent="onAddNote"
          class="rounded-lg bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 relative cursor-pointer disabled:cursor-not-allowed transition-transform duration-300 hover:scale-95 transfo disabled:transform-none"
          :class="disabledClasses"
          :disabled="!title"
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
          <font-awesome-icon :icon="faPlus" class="ml-2" />
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
            ref="doneButtonRef"
            class="custom-filter-button bg-green-500 hover:bg-green-400 disabled:bg-green-300"
            :disabled="!hasNotes || (hasNotes && !hasDoneNotes)"
          >
            Done
            <font-awesome-icon :icon="regularSquare" class="text-lg ml-2" />
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
