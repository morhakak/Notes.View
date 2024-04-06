import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "../config";

export const useAuthStore = defineStore("auth", () => {
  const registerUrl = `${BASE_URL}/auth/register`;
  const loginUrl = `${BASE_URL}/auth/login`;
  const isLoading = ref(false);
  const errors = ref([]);

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
    const loginRequest = {
      email,
      password,
    };
    const userName = email.split("@")[0];
    try {
      const response = await axios.post(loginUrl, loginRequest);
      if (response.status === 200) {
        return `${userName} logged in sucessfully!`;
      }
    } catch (error) {
      return `Incorrect email or password`;
    } finally {
      isLoading.value = true;
    }
  };

  return {
    register,
    login,
    isLoading,
    errors,
  };
});
