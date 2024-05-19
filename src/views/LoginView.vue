<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const authStore = useAuthStore();
const { login } = authStore;
const { isLoading, errors } = storeToRefs(authStore);
const router = useRouter();
const isPasswordVisible = ref(false);
const emailInput = ref(null);

onMounted(() => {
  errors.value = [];
  emailInput.value.focus();
});

const email = ref("");
const password = ref("");

function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

function validateInput(input) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/;
  return regex.test(input);
}

const computedEmail = computed(() => {
  return !validateEmail(email.value) ? "Please enter a valid email" : "";
});

const isValidInputs = computed(() => {
  return validateEmail(email.value) && validateInput(password.value);
});

const loginUser = async () => {
  var response = await login(email.value, password.value);
  if (response) {
    router.push({ name: "home" });
  } else {
    router.push({ name: "login" });
  }
};

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

const passwordVisibilityIcon = computed(() => {
  return isPasswordVisible.value ? faEye : faEyeSlash;
});
</script>

<template>
  <div
    class="max-w-md mx-auto shadow-lg mt-10 rounded-md md:max-w-lg lg:max-w-xl p-4 relative shadow-slate-400 dark:bg-blue-950 dark:shadow-slate-700"
  >
    <form class="flex flex-col relative">
      <div class="flex items-center relative">
        <font-awesome-icon
          :icon="faEnvelope"
          class="text-md text-blue-500 mb-4 absolute dark:text-blue-100"
        />
        <input
          class="h-10 mb-4 focus:outline-none pl-6 w-full border-b-2 dark:bg-blue-950 dark:text-white"
          v-model="email"
          @input="validateEmail"
          type="email"
          placeholder="Email"
          ref="emailInput"
        />
      </div>
      <p
        class="text-red-500 text-xs absolute left-0 top-11"
        v-show="email.length > 0"
      >
        {{ computedEmail }}
      </p>
      <div class="flex items-center relative">
        <font-awesome-icon
          :icon="faLock"
          class="text-md text-blue-500 mb-4 absolute dark:text-blue-100"
        />
        <input
          class="h-10 mb-4 focus:outline-none pl-6 pr-6 w-full border-b-2 dark:bg-blue-950 dark:text-white"
          v-model="password"
          :type="isPasswordVisible ? 'input' : 'password'"
          placeholder="Password"
        />
        <font-awesome-icon
          :icon="passwordVisibilityIcon"
          @click="togglePasswordVisibility"
          class="text-md text-blue-500 mb-4 absolute left dark:text-blue-100"
        />
      </div>
      <button
        class="hover:cursor-pointer h-10 bg-blue-500 text-white mb-14 hover:bg-blue-300 disabled:bg-blue-200 dark:bg-blue-800 dark:disabled:bg-blue-500"
        :disabled="!isValidInputs"
        @click.prevent="loginUser"
        type="submit"
      >
        <img
          v-if="isLoading"
          class="w-6 h-6 inline-block absolute left-2"
          src="../assets/spinners/spinner.gif"
          alt=""
        />
        Login
      </button>
    </form>
    <p
      class="text-red-500 text-sm font-semibold absolute bottom-8 md:bottom-12"
      v-show="errors.length > 0"
    >
      Login failed: {{ errors[0] }}
    </p>
    <p class="text-center text-xs dark:text-blue-100">
      Don't have an account yet?
      <RouterLink
        :to="{ name: 'register' }"
        class="text-blue-900 font-semibold hover:cursor-pointer hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-50"
        >Register</RouterLink
      >
    </p>
  </div>
</template>

<style scoped>
.top {
  top: 90px;
}

.left {
  left: 96%;
}
</style>
