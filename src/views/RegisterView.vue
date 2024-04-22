<script setup>
import { computed, ref, watch } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const authStore = useAuthStore();
const { register } = authStore;
const { isLoading, errors } = storeToRefs(authStore);
const router = useRouter();

const showPasswordTooltip = ref(false);

const email = ref("");
const password = ref("");

watch(errors, () => {
  setTimeout(() => {
    errors.value = [];
  }, 5000);
});

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

const computedPassword = computed(() => {
  return !validateInput(password.value)
    ? "Password legnth should be 6 characters"
    : "";
});

const isValidInputs = computed(() => {
  return validateEmail(email.value) && validateInput(password.value);
});

const registerUser = async () => {
  var response = await register(email.value, password.value);
  if (response) {
    router.push({ name: "login" });
  }
};
</script>

<template>
  <div class="relative">
    <div
      class="max-w-md mx-auto shadow-lg mt-10 rounded-md md:max-w-lg lg:max-w-xl p-4 relative"
    >
      <form class="flex flex-col relative justify-center">
        <input
          class="h-10 mb-4 mx-8 focus:outline-none"
          v-model="email"
          @input="validateEmail"
          type="email"
          placeholder="Your@email.com"
        />
        <p
          class="text-red-500 text-xs absolute left-8 top-10"
          v-show="email.length > 0"
        >
          {{ computedEmail }}
        </p>
        <div class="flex items-center mb-4 gap-2">
          <font-awesome-icon
            :icon="faInfoCircle"
            @mouseover="showPasswordTooltip = true"
            @mouseleave="showPasswordTooltip = false"
            class="text-md text-blue-500"
          />
          <input
            class="h-10 flex-1 mr-8 ml-2 focus:outline-none"
            v-model="password"
            type="password"
            placeholder="YourSecretPa$$word"
          />
        </div>

        <p
          class="text-red-500 text-xs absolute left-8 top"
          v-show="password.length > 0"
        >
          {{ computedPassword }}
        </p>
        <button
          class="hover:cursor-pointer mx-8 h-10 bg-blue-500 text-white mb-14 hover:bg-blue-300 disabled:bg-blue-200 px-8"
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
        class="text-red-500 text-sm font-semibold absolute px-2 bottom-12"
        v-show="errors.length > 0"
      >
        Unable to register user: {{ errors[0] }}
      </p>
      <p class="text-center text-xs">
        Already registered?
        <RouterLink
          :to="{ name: 'login' }"
          class="text-blue-900 font-semibold hover:cursor-pointer hover:text-blue-700"
          >Login</RouterLink
        >
      </p>
    </div>
    <Transition name="fade">
      <div
        v-show="showPasswordTooltip"
        class="absolute bg-white shadow-md p-2 rounded-md text-sm top-24 left-32 z-10"
      >
        <p>Password requirements:</p>
        <ul>
          <li>- At least 8 characters</li>
          <li>- At least one uppercase letter</li>
          <li>- At least one lowercase letter</li>
          <li>- At least one number</li>
          <li>- At least one special character</li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.top {
  top: 90px;
}

/* Opacity transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
