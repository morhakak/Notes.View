<!-- <template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link :to="{ path: '/' }">Home</router-link>
      </li>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
      >
        <router-link :to="breadcrumb.link">{{ breadcrumb.label }}</router-link>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const breadcrumbs = computed(() => {
  const routes = route.matched;
  const breadcrumbs = [];
  routes.forEach((route) => {
    breadcrumbs.push({
      label: route.meta.breadcrumb,
      link: route.path,
    });
  });
  return breadcrumbs;
});
</script>

<style scoped></style> -->

<template>
  <nav aria-label="breadcrumb">
    <ol class="flex space-x-2">
      <li>
        <router-link
          :to="{ path: '/' }"
          class="text-gray-500 hover:text-gray-700"
          >Home</router-link
        >
      </li>
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <span class="text-gray-500"> > </span>
        <router-link
          :to="breadcrumb.link"
          class="text-gray-500 hover:text-gray-700"
          >{{ breadcrumb.label }}</router-link
        >
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

console.log("Route object:", route);

// Compute breadcrumbs based on the route hierarchy
const breadcrumbs = computed(() => {
  let breadcrumbs = [];
  let parent = route;
  while (parent) {
    const breadcrumb = {
      link: { name: parent.name },
      label: parent.meta.breadcrumb || parent.name,
    };
    breadcrumbs.unshift(breadcrumb);
    parent = parent.parent;
  }

  // Check if the current route is a child route of the dashboard
  const isDashboardChild = route.name && route.name.startsWith("dashboard");

  // If the current route is a child route of the dashboard, add "Dashboard" breadcrumb
  if (
    isDashboardChild &&
    breadcrumbs.length > 0 &&
    breadcrumbs[0].label !== "Dashboard"
  ) {
    breadcrumbs.unshift({
      link: { name: "dashboard" },
      label: "Dashboard",
    });
  }

  return breadcrumbs;
});
</script>
