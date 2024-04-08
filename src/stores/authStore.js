import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { BASE_URL } from "../config";

export const useAuthStore = defineStore("auth", () => {
  const registerUrl = `${BASE_URL}/auth/register`;
  const loginUrl = `${BASE_URL}/auth/login`;
  const isLoading = ref(false);
  const errors = ref([]);
  const token = ref(localStorage.getItem("notesAppToken") || null);

  const register = async (email, password) => {
    isLoading.value = true;
    try {
      const registerRequest = { email, password };
      const response = await axios.post(registerUrl, registerRequest);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        console.log("Registration successful:", responseData);
        return responseData;
      } else {
        errors.value.push(response.data);
        console.error("Registration failed with status:", response.status);
        return null;
      }
    } catch (error) {
      errors.value.push(error.message);
      console.error("Error during registration:", error.message);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email, password) => {
    isLoading.value = true;
    try {
      const loginRequest = { email, password };
      const response = await axios.post(loginUrl, loginRequest);

      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        token.value = responseData;
        localStorage.setItem("notesAppToken", token.value);
        console.log("Successful login:", responseData);
        return responseData;
      } else {
        errors.value.push(response.data);
        console.error("Login failed with status:", response.status);
        return null;
      }
    } catch (error) {
      errors.value.push(error.message);
      console.error("Error during login:", error.message);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    token.value = null;
  };

  const isLoggedIn = computed(() => {
    return !!token.value;
  });

  function getTokenFromStorage() {
    token.value = localStorage.getItem("notesAppToken");
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
