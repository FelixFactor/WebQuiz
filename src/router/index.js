import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Recover from "@/views/Recover.vue";

import Home from "@/Components/Home.vue";
import AvailableList from "@/Components/Available.vue";
import FinishedList from "@/Components/Finished.vue";
import ScheduledList from "@/Components/Scheduled.vue";
import UserSettings from "@/Components/UserSettings.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },

  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/recover",
    name: "recover",
    component: Recover
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    props: true,
    children: [
      {
        path: "available",
        name: "available-list",
        component: AvailableList
      },
      {
        path: "finished",
        name: "finished-list",
        component: FinishedList
      },
      {
        path: "scheduled",
        name: "scheduled-list",
        component: ScheduledList
      },
      {
        path: "settings",
        name: "userSettings",
        component: UserSettings
      }
    ]
  },
  
  {
    path: "*",
    redirect: "NotFound"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
