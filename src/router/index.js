import Vue from "vue";
import VueRouter from "vue-router";

import UserHome from "../views/User/Home";
import Blog from "../views/User/Blog";
import About from "../views/User/About";
import Project from "../views/User/Project";
import BlogPost from "../views/User/BlogPost";

import Auth from "../views/Auth";

import Admin from "../views/Admin";
import Dashboard from "../views/Admin/Dashboard";
import Projects from "../views/Admin/Projects";
import Blogs from "../views/Admin/Blogs";
import Settings from "../views/Admin/Settings";

import Error404 from "../components/Error404";

import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "UserHome",
    component: UserHome,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/blog/:id",
    name: "BlogPost",
    component: BlogPost,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/projects/:id",
    name: "Project",
    component: Project,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/projects",
        name: "Projects",
        component: Projects,
      },
      {
        path: "/admin/blogs",
        name: "Blogs",
        component: Blogs,
      },
      {
        path: "/admin/settings",
        name: "Settings",
        component: Settings,
      },
    ],
  },
  {
    path: "/*",
    name: "Error404",
    component: Error404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: "/auth",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (store.getters.isAuthenticated && to.name === "Auth") {
    next({
      path: "/admin",
    });
  } else {
    next();
  }
});

export default router;
