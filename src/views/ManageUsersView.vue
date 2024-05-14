<template>
  <div class="w-full gap-10 py-6 px-4 dark:text-white">
    <div class="flex flex-col justify-center items-center gap-6">
      <h1 class="text-3xl font-semibold">User Managment</h1>
      <TransitionGroup name="usersList" tag="div" class="flex flex-col gap-4">
        <UserInfo
          v-for="user in users"
          :key="user.id"
          :user="user"
          @delete-user="onDeleteUser"
        />
      </TransitionGroup>
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

<style scoped>
.userslist-enter-active {
  transition: all 0.4s ease;
}

.userslist-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.userslist-enter-from,
.userslist-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.userslist-move {
  transition: all 0.4s ease;
}
</style>
