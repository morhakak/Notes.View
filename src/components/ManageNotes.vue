<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useNoteStore } from "../stores/noteStore.js";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare as regularSquare } from "@fortawesome/free-regular-svg-icons";

const emit = defineEmits(["addNote", "all", "liked", "done"]);

const content = defineModel("content");
const title = defineModel("title", { required: true });

const showTooltip = ref(false);
const addButtonRef = ref(null);
const titleRef = ref(null);

const store = useNoteStore();
const { hasNotes, hasLikedNotes, hasDoneNotes, isLoadingNotes } =
  storeToRefs(store);

const onMouseHover = () => {
  if (!content.value) showTooltip.value = true;
  else showTooltip.value = true;
};

const onMouseLeave = () => {
  showTooltip.value = false;
};

const onAddNote = () => {
  emit("addNote");
  titleRef.value.focus();
};
</script>

<template>
  <div
    class="max-w-3xl h-60 rounded-md shadow-lg mx-auto mt-8 flex flex-col justify-center items-center"
  >
    <div class="w-80 flex flex-col">
      <input
        v-model="title"
        type="text"
        placeholder="Note title"
        class="input"
        maxlength="50"
        ref="titleRef"
      />
      <input
        @keyup.enter="onAddNote"
        v-model="content"
        type="text"
        placeholder="I need to..."
        class="input"
        maxlength="50"
      />
      <button
        @click="onAddNote"
        class="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed relative"
        :class="{
          'tooltip-btn': !content,
        }"
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
        <span v-if="showTooltip" class="tooltip">Write a note...</span>
        Add Note
      </button>

      <div class="flex mt-4 gap-6">
        <button
          @click="$emit('all')"
          class="custom-filter-button"
          :disabled="!hasNotes"
        >
          All
        </button>
        <button
          @click="$emit('done')"
          class="custom-filter-button"
          :disabled="!hasNotes || (hasNotes && !hasDoneNotes)"
        >
          Done
          <font-awesome-icon
            :icon="regularSquare"
            @click.stop="$emit('toggleDone', note.id)"
            class="text-lg"
          />
        </button>
        <button
          @click="$emit('liked')"
          class="custom-filter-button"
          :disabled="!hasNotes || (hasNotes && !hasLikedNotes)"
        >
          Liked
          <font-awesome-icon :icon="regularHeart" class="regular-heart ml-1" />
        </button>
      </div>
    </div>
  </div>
</template>
