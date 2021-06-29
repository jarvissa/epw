<template>
  <header class="header pa-1">
    <div class="container-fluid">
      <div class="row">
        <div class="col col-12">
          <nav class="navbar">
            <ul class="d-flex justify-between align-center">
              <li class="menu-bar" @click="toggleMenu">
                <i class="fas fa-bars"></i>
              </li>
              <li>
                <router-link
                  to="/"
                  class="link link__home"
                  exact-active-class="link__active"
                  >Emin A.</router-link
                >
              </li>
              <li>
                <button class="btn logout" @click="handleClick">Logout</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { eventBus } from "@/main";
import { mapActions } from "vuex";

export default {
  name: "AdminHeader",
  methods: {
    ...mapActions(["logout", "changeLoadingState"]),
    toggleMenu() {
      eventBus.$emit("toggleMenu");
    },
    handleClick() {
      this.logout()
        .then(() => {
          this.$router.push({ name: "Auth" });
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "An error occurred!",
            type: "error",
            duration: 3000,
          });
        })
        .finally(() => {
          this.changeLoadingState();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

ul {
  .menu-bar {
    cursor: pointer;
    transition: all 0.3s ease;
    color: $color-primary;

    i {
      font-size: 24px !important;
    }

    &:hover {
      color: var(--color-theme);
    }
  }

  .logout {
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
