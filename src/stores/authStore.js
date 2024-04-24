import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
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
        handleErrorResponse(response);
        return null;
      }
    } catch (error) {
      handleRequestError(error);
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
        handleLoginSuccess(response.data.data);
        return response.data.data;
      } else {
        handleErrorResponse(response);
        return null;
      }
    } catch (error) {
      console.log(error);
      handleRequestError(error);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const handleLoginSuccess = (tokenData) => {
    token.value = tokenData;
    const decodedToken = jwtDecode(tokenData);
    updateUserName(decodedToken);
    localStorage.setItem(config.LOCAL_STORAGE_KEY, tokenData);
  };

  const handleErrorResponse = (response) => {
    if (response.data && response.data.message) {
      errors.value.push(response.data.message);
    } else {
      errors.value.push("An error occurred. Please try again later.");
    }
  };

  const handleRequestError = (error) => {
    if (error.response) {
      handleErrorResponse(error.response);
    } else {
      errors.value.push(
        "Network error. Please check your connection and try again."
      );
    }
  };

  const updateUserName = (decodedToken) => {
    userName.value =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ].split("@")[0];
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
    if (token.value) {
      const decodedToken = jwtDecode(token.value);
      updateUserName(decodedToken);
    }
  }

  watch(token, (newToken) => {
    if (newToken) {
      const decodedToken = jwtDecode(newToken);
      updateUserName(decodedToken);
    } else {
      userName.value = null;
    }
  });

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
