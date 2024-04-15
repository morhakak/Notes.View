import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { BASE_URL } from "../config";

export const useAuthStore = defineStore("auth", () => {
  const registerUrl = `${BASE_URL}/auth/register`;
  const loginUrl = `${BASE_URL}/auth/login`;
  const isLoading = ref(false);
  const errors = ref([]);
  const LOCAL_STORAGE_KEY = "notesAppToken";
  const token = ref(localStorage.getItem(LOCAL_STORAGE_KEY) || null);

  const register = async (email, password) => {
    isLoading.value = true;
    try {
      const response = await axios.post(registerUrl, { email, password });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        errors.value.push(response.data);
        return null;
      }
    } catch (error) {
      errors.value.push(error.response.data);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email, password) => {
    isLoading.value = true;
    try {
      const response = await axios.post(loginUrl, { email, password });
      if (response.status >= 200 && response.status < 300) {
        token.value = response.data.data;
        localStorage.setItem(LOCAL_STORAGE_KEY, token.value);
        return response.data.data;
      } else {
        errors.value.push(response.data);
        return null;
      }
    } catch (error) {
      errors.value.push(error.response.data);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    token.value = null;
  };

  const isLoggedIn = computed(() => {
    return !!token.value;
  });

  function getTokenFromStorage() {
    token.value = localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  return {
    register,
    login,
    logout,
    getTokenFromStorage,
    isLoggedIn,
    isLoading,
    errors,
    token,
  };
});
