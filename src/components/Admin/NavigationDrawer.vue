<template>
  <div class="navigation-drawer py-1">
    <ul>
      <router-link
        class="d-flex align-center py-1"
        to="/admin"
        tag="li"
        exact-active-class="nav__item--active"
      >
        <i class="fas fa-home d-flex justify-center ml-1"></i>
        <span class="ml-3">Dashboard</span>
      </router-link>
      <router-link
        class="d-flex align-center py-1"
        to="/admin/projects"
        tag="li"
        exact-active-class="nav__item--active"
      >
        <i class="fas fa-project-diagram d-flex justify-center ml-1"></i>
        <span class="ml-3">Projects</span>
      </router-link>
      <router-link
        class="d-flex align-center py-1"
        to="/admin/blogs"
        tag="li"
        exact-active-class="nav__item--active"
      >
        <i class="fas fa-blog d-flex justify-center ml-1"></i>
        <span class="ml-3">Blogs</span>
      </router-link>
      <router-link
        class="d-flex align-center py-1"
        to="/admin/settings"
        tag="li"
        exact-active-class="nav__item--active"
      >
        <i class="fas fa-cog d-flex justify-center ml-1"></i>
        <span class="ml-3">Settings</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "NavigationDrawer",
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    checkIfMqMatches() {
      return window.matchMedia("(max-width: 991.98px)").matches;
    },
  },
  created() {
    if (this.checkIfMqMatches()) this.drawer = false;

    eventBus.$on("toggleMenu", () => {
      this.drawer = !this.drawer;

      const nav = document.querySelector(".admin__nav");
      const drawer = document.querySelector(".navigation-drawer");
      const content = document.querySelector(".admin__content");

      if (this.checkIfMqMatches()) {
        if (!this.drawer) {
          drawer.style.left = "-100%";
        } else {
          drawer.style.left = "0";
        }
      } else {
        if (!this.drawer) {
          nav.style.marginLeft = "calc(-100% / (12 / 2)";
          content.style.flexBasis = "100%";
        } else {
          nav.style.marginLeft = "0";
          content.style.flexBasis = "calc(100% / (12 / 10))";
        }
      }
    });
    eventBus.$on("clickOutside", (res) => {
      if (this.checkIfMqMatches() && res) {
        this.drawer = false;
        const drawer = document.querySelector(".navigation-drawer");

        if (!this.drawer) {
          drawer.style.left = "-100%";
        } else {
          drawer.style.left = "0";
        }
      }
    });
  },
};
</script>
