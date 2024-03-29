<script setup>
import { useNoteStore } from "@/stores/noteStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import NoteItem from "../components/NoteItem.vue";
import ManageNotes from "../components/ManageNotes.vue";
import ErrorHandler from "../components/ErrorHandler.vue";

const store = useNoteStore();
let { addToNotes, removeFromNotes, toggleIsLiked, loadNotes, toggleIsDone } =
  store;
const { filtered, filterOption, errors, hasNotes, hasErrors, isLoadingNotes } =
  storeToRefs(store);

const noteTitle = ref("");
const inputContent = ref("");

const add = () => {
  addToNotes(noteTitle.value, inputContent.value);
  inputContent.value = "";
  noteTitle.value = "";
};

onMounted(() => {
  loadNotes();
});
</script>

<template>
  <div>
    <ManageNotes
      @add-note="add"
      @all="filterOption = 'all'"
      @liked="filterOption = 'liked'"
      @done="filterOption = 'done'"
      v-model:content="inputContent"
      v-model:title="noteTitle"
    />
    <div
      class="max-w-2xl max-h-screen rounded-md mx-auto mt-8 flex flex-col relative"
    >
      <img
        v-if="isLoadingNotes"
        class="w-6 h-6 mx-auto"
        src="../assets/spinners/spinner.gif"
        alt=""
      />
      <ErrorHandler v-if="hasErrors" :errors="errors" />
      <div v-if="!isLoadingNotes && !hasErrors && hasNotes">
        <NoteItem
          v-for="note in filtered"
          :key="note.id"
          :note="note"
          @toggle-liked="toggleIsLiked"
          @remove-note="removeFromNotes"
          @toggle-done="toggleIsDone"
        />
      </div>
      <div v-if="!hasNote && !isLoadingNotes && !hasNotes" class="text-center">
        No notes available.
      </div>
    </div>
  </div>
</template>

<style>
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-move {
  transition: all 0.4s ease;
}

.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.switch-enter-active,
.switch-leave-active {
  transition: all 0.3s ease;
}
</style>
