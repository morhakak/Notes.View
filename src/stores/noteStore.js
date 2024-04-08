import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuthStore } from "./authStore";

export const useNoteStore = defineStore("note", () => {
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);
  const notes = ref([]);
  const filterOption = ref("all");
  const baseUrl = `${BASE_URL}/notes`;
  const errors = ref([]);
  const isLoadingNotes = ref(false);

  const loadNotes = async () => {
    try {
      isLoadingNotes.value = true;
      console.log("**** token ***: ", token.value);
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      notes.value = response.data;
    } catch (error) {
      errors.value.push(error.message);
      console.error("Error loading notes:", error);
    } finally {
      isLoadingNotes.value = false;
    }
  };

  const removeFromNotes = async (noteId) => {
    try {
      const response = await axios.delete(`${baseUrl}/${noteId}`);
      if (response.status >= 200 && response.status < 300) {
        notes.value = notes.value.filter((note) => note.id !== noteId);
      }
    } catch (error) {
      console.error("Error removing note:", error);
    }
  };

  const toggleNoteProperty = async (note, propertyName, toggleValue) => {
    const updateNote = {
      [propertyName]: toggleValue,
    };
    try {
      await axios.put(`${baseUrl}/${note.id}/${propertyName}`, updateNote);
      note[propertyName] = toggleValue;
    } catch (error) {
      console.error(`Error toggling ${propertyName}:`, error);
    }
  };

  const toggleIsLiked = async (noteId) => {
    const note = notes.value.find((note) => note.id === noteId);
    await toggleNoteProperty(note, "isLiked", !note.isLiked);
  };

  const toggleIsDone = async (noteId) => {
    const note = notes.value.find((note) => note.id === noteId);
    await toggleNoteProperty(note, "isDone", !note.isDone);
  };

  const filtered = computed(() => {
    if (filterOption.value === "liked" && hasLikedNotes) {
      return notes.value.filter((note) => note.isLiked);
    } else if (filterOption.value === "done" && hasDoneNotes) {
      return notes.value.filter((note) => note.isDone);
    } else {
      return notes.value;
    }
  });

  const addToNotes = async (title, content) => {
    if (!content) return;
    const note = {
      title,
      content,
    };
    try {
      const response = await axios.post(baseUrl, note);
      if (response.status === 200) {
        notes.value.push(response.data);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      await loadNotes();
    }
  };

  const hasNotes = computed(() => {
    return notes.value.length > 0;
  });

  const hasLikedNotes = computed(() => {
    return notes.value.filter((note) => note.isLiked).length > 0;
  });

  const hasDoneNotes = computed(() => {
    return notes.value.filter((note) => note.isDone).length > 0;
  });

  const hasErrors = computed(() => {
    return errors.value.length > 0;
  });

  return {
    addToNotes,
    removeFromNotes,
    filtered,
    filterOption,
    toggleIsLiked,
    toggleIsDone,
    loadNotes,
    hasNotes,
    hasLikedNotes,
    hasDoneNotes,
    errors,
    hasErrors,
    isLoadingNotes,
  };
});
