import { createRouter, createWebHistory } from "vue-router";
import NotesView from "../views/NotesView.vue";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: NotesView,
      beforeEnter: (_, from, next) => {
        const { isAdmin, isLoggedIn } = storeToRefs(useAuthStore());
        if (isAdmin.value && from.name !== "dashboard") {
          next();
        } else if (isLoggedIn) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: (to, from, next) => {
        const { isLoggedIn } = storeToRefs(useAuthStore());
        if (isLoggedIn.value) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/dashboard/stats",
      name: "stats",
      component: () => import("../views/StatisticsView.vue"),
    },
    {
      path: "/dashboard/users",
      name: "users",
      component: () => import("../views/ManageUsersView.vue"),
    },
    {
      path: "/dashboard/notes",
      name: "notes",
      component: () => import("../views/ManageNotesView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
  ],
});

export default router;
