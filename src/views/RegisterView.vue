<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import PasswordTooltip from "@/components/PasswordTooltip.vue";
import { faCheckCircle as regularCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as solidCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const authStore = useAuthStore();
const router = useRouter();
const { register } = authStore;
const { isLoading, errors } = storeToRefs(authStore);
const showPasswordTooltip = ref(false);
const isPasswordVisible = ref(false);

const email = ref("");
const password = ref("");

onMounted(() => {
  errors.value = [];
});

function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

function validPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/;
  return regex.test(password);
}

const computedEmail = computed(() => {
  return !validateEmail(email.value) ? "Please enter a valid email" : "";
});

const isValidInputs = computed(() => {
  return validateEmail(email.value) && validPassword(password.value);
});

const registerUser = async () => {
  var response = await register(email.value, password.value);
  if (response) {
    router.push({ name: "login" });
  }
};

const isValidPasswordLength = computed(() => {
  return password.value.length >= 8;
});

const hasUppercaseAndLowercase = computed(() => {
  const lowerRegex = /[a-z]/;
  const upperRegex = /[A-Z]/;
  return lowerRegex.test(password.value) && upperRegex.test(password.value);
});

const hasNumberAndSpecialChar = computed(() => {
  const specialCharacters = /[`!@#$%^&*()_\-+=\\[\]{};':"\\|,.<>\\/?~ ]/;
  const containsNumber = /[0-9]/.test(password.value);
  const containsSpecialCharacter = specialCharacters.test(password.value);
  return containsSpecialCharacter && containsNumber;
});

const passwordLengthIcon = computed(() => {
  return isValidPasswordLength.value ? solidCircle : regularCircle;
});

const letterCaseIcon = computed(() => {
  return hasUppercaseAndLowercase.value ? solidCircle : regularCircle;
});

const numberAndSymbolIcon = computed(() => {
  return hasNumberAndSpecialChar.value ? solidCircle : regularCircle;
});

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

const passwordVisibilityIcon = computed(() => {
  return isPasswordVisible.value ? faEye : faEyeSlash;
});
</script>

<template>
  <div class="relative">
    <div
      class="max-w-md mx-auto shadow-lg mt-10 rounded-md md:max-w-lg lg:max-w-xl p-4 relative dark:bg-blue-950 dark:shadow-slate-700"
    >
      <form class="flex flex-col relative justify-center">
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
          />
        </div>
        <p
          class="text-red-500 text-xs absolute top-11"
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
        <div class="text-xs mb-4">
          <ul>
            <li
              class="mb-1 transition duration-200 ease-in"
              :class="{
                'text-green-500': isValidPasswordLength,
                'text-gray-500  dark:text-gray-200': !isValidPasswordLength,
              }"
            >
              <font-awesome-icon :icon="passwordLengthIcon" />
              At least 8 characters
            </li>
            <li
              class="mb-1 transition duration-200 ease-in"
              :class="{
                'text-green-500': hasUppercaseAndLowercase,
                'text-gray-500  dark:text-gray-200': !hasUppercaseAndLowercase,
              }"
            >
              <font-awesome-icon :icon="letterCaseIcon" />
              Lowercase (a-z) and uppercase (A-Z)
            </li>
            <li
              class="mb-1 transition duration-200 ease-in"
              :class="{
                'text-green-500': hasNumberAndSpecialChar,
                'text-gray-500 dark:text-gray-200': !hasNumberAndSpecialChar,
              }"
            >
              <font-awesome-icon :icon="numberAndSymbolIcon" />
              At least one number (0-9) and one symbol
            </li>
          </ul>
        </div>
        <button
          class="hover:cursor-pointer h-10 bg-blue-500 text-white mb-14 hover:bg-blue-300 disabled:bg-blue-200 w-full dark:bg-blue-800 dark:disabled:bg-blue-500"
          :disabled="!isValidInputs"
          @click.prevent="registerUser"
          type="submit"
        >
          <img
            v-if="isLoading"
            class="w-6 h-6 inline-block absolute left-10"
            src="../assets/spinners/spinner.gif"
            alt=""
          />
          Register
        </button>
      </form>
      <p
        class="text-red-500 text-sm font-semibold absolute px-2 bottom-10"
        v-show="errors.length > 0"
      >
        Registration failed: {{ errors[0] }}
      </p>
      <p class="text-center text-xs dark:text-blue-100">
        Already registered?
        <RouterLink
          :to="{ name: 'login' }"
          class="text-blue-900 font-semibold hover:cursor-pointer hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-50"
          >Login</RouterLink
        >
      </p>
    </div>
    <PasswordTooltip
      :password="password"
      :show-password-tooltip="showPasswordTooltip"
    />
  </div>
</template>

<style scoped>
.top {
  top: 90px;
}

.left {
  left: 96%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
