import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { config } from "../config";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  const isLoading = ref(false);
  const errors = ref([]);
  const token = ref(localStorage.getItem(config.LOCAL_STORAGE_KEY) || null);
  const userName = ref(null);

  const register = async (email, password) => {
    isLoading.value = true;
    try {
      const response = await axios.post(config.REGISTER_URL, {
        email,
        password,
      });
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
      const response = await axios.post(config.LOGIN_URL, { email, password });
      if (response.status >= 200 && response.status < 300) {
        token.value = response.data.data;
        const decodedToken = jwtDecode(token.value);
        userName.value =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ].split("@")[0];
        localStorage.setItem(config.LOCAL_STORAGE_KEY, token.value);
        return response.data.data;
      } else {
        errors.value.push(response.data);
        return null;
      }
    } catch (error) {
      if (!error.response) {
        errors.value.push(`${error.message}, please try again later`);
      }
      console.error("Response error:", error.response.data);
      errors.value.push(`${error.response.data}`);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem(config.LOCAL_STORAGE_KEY);
    token.value = null;
    errors.value = [];
    userName.value = null;
  };

  const isLoggedIn = computed(() => {
    return !!token.value;
  });

  function getTokenFromStorage() {
    token.value = localStorage.getItem(config.LOCAL_STORAGE_KEY);
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
    userName,
  };
});
