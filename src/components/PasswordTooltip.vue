<script setup>
import { faCheckCircle as regularCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as solidCircle } from "@fortawesome/free-solid-svg-icons";
import { computed } from "vue";

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  showPasswordTooltip: {
    type: Boolean,
    required: true,
  },
});

const password = computed({
  get() {
    return props.password;
  },
});

const passwordLengthIcon = computed(() => {
  return password.value.length >= 8 ? solidCircle : regularCircle;
});

const uppercaseLetterIcon = computed(() => {
  const containsUppercase = /[A-Z]/.test(password.value);
  return containsUppercase ? solidCircle : regularCircle;
});

const lowercaseLetterIcon = computed(() => {
  const containsUppercase = /[a-z]/.test(password.value);
  return containsUppercase ? solidCircle : regularCircle;
});

const specialCharacterIcon = computed(() => {
  const specialCharacters = /[`!@#$%^&*()_\-+=\\[\]{};':"\\|,.<>\\/?~ ]/;
  const containsSpecialCharacter = specialCharacters.test(password.value);
  return containsSpecialCharacter ? solidCircle : regularCircle;
});

const numberIcon = computed(() => {
  const containsUppercase = /[0-9]/.test(password.value);
  return containsUppercase ? solidCircle : regularCircle;
});
</script>

<template>
  <Transition name="fade">
    <div
      v-show="showPasswordTooltip"
      class="absolute bg-white shadow-md p-2 rounded-md text-sm top-24 left-32 z-10"
    >
      <p>Password requirements:</p>
      <ul>
        <li>
          <font-awesome-icon
            :icon="passwordLengthIcon"
            class="text-md text-green-500"
          />
          At least 8 characters
        </li>
        <li>
          <font-awesome-icon
            :icon="uppercaseLetterIcon"
            class="text-md text-green-500"
          />
          One uppercase letter
        </li>
        <li>
          <font-awesome-icon
            :icon="lowercaseLetterIcon"
            class="text-md text-green-500"
          />
          One lowercase letter
        </li>
        <li>
          <font-awesome-icon
            :icon="numberIcon"
            class="text-md text-green-500"
          />
          One number
        </li>
        <li>
          <font-awesome-icon
            :icon="specialCharacterIcon"
            class="text-md text-green-500"
          />
          One special character
        </li>
      </ul>
    </div>
  </Transition>
</template>
