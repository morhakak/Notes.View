<template>
  <div class="w-full gap-10 px-4 dark:text-white">
    <div class="flex flex-col justify-center items-center gap-6">
      <h1 class="text-3xl">User Managment</h1>
      <div class="flex flex-col gap-4">
        <UserInfo
          v-for="user in users"
          :key="user.id"
          :user="user"
          @delete-user="onDeleteUser"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import UserInfo from "@/components/UserInfo.vue";
import { useDashboardStore } from "@/stores/dashboardStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const { users } = storeToRefs(useDashboardStore());
const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.getUsers();
});

const onDeleteUser = (userId) => {
  dashboardStore.deleteUser(userId);
};
</script>

<style scoped></style>
