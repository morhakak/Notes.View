<script setup>
import { useNoteStore } from "@/stores/noteStore";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import NoteItem from "../components/NoteItem.vue";
import ManageNotes from "../components/ManageNotes.vue";
import ErrorHandler from "../components/ErrorHandler.vue";

const notesStore = useNoteStore();
let { addToNotes, removeFromNotes, toggleIsLiked, loadNotes, toggleIsDone } =
  notesStore;
const { filtered, filterOption, errors, hasNotes, hasErrors, isLoadingNotes } =
  storeToRefs(notesStore);

const { isAdmin } = storeToRefs(useAuthStore());

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
      v-if="!isAdmin"
      @add-note="add"
      @all="filterOption = 'all'"
      @liked="filterOption = 'liked'"
      @done="filterOption = 'done'"
      v-model:content="inputContent"
      v-model:title="noteTitle"
    />
    <div class="max-w-3xl rounded-md mx-auto mt-8 flex flex-col relative">
      <ErrorHandler v-if="hasErrors" :errors="errors" />
      <TransitionGroup
        name="list"
        tag="ul"
        class="justify-start grid grid-cols-2 px-4 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-3"
      >
        <NoteItem
          v-for="note in filtered"
          :key="note.id"
          :note="note"
          @toggle-liked="toggleIsLiked"
          @remove-note="removeFromNotes"
          @toggle-done="toggleIsDone"
        />
      </TransitionGroup>
      <div
        v-if="!hasErrors && !isLoadingNotes && !hasNotes"
        class="text-center font-bold text-xl"
      >
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
