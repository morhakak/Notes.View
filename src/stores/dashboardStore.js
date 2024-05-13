import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "../axios.js";
import { appConfig } from "../config";
// import { jwtDecode } from "jwt-decode";

export const useDashboardStore = defineStore("dashboard", () => {
  const isLoading = ref(false);
  const errors = ref([]);
  //   const token = ref(localStorage.getItem(appConfig.LOCAL_STORAGE_KEY) || null);
  const users = ref([]);
  const isAdmin = ref(false);

  function resetErrors() {
    errors.value = [];
  }

  const getUsers = async () => {
    isLoading.value = true;
    resetErrors();
    try {
      const response = await axios.get(appConfig.DASHBOARD_USERS);
      console.log("dashboard response:", response);
      if (response.status >= 200 && response.status < 300) {
        users.value = response.data.data;
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

  const deleteUser = async (userId) => {
    resetErrors();
    try {
      const response = await axios.delete(appConfig.DASHBOARD_USERS, {
        userId,
      });
      if (response.status >= 200 && response.status < 300) {
        return true;
      } else {
        handleErrorResponse(response);
        return false;
      }
    } catch (error) {
      console.log(error);
      handleRequestError(error);
      return false;
    } finally {
      isLoading.value = false;
    }
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

  return {
    getUsers,
    deleteUser,
    isLoading,
    errors,
    isAdmin,
    users,
  };
});
