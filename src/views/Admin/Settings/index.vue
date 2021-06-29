<template>
  <div class="settings h-100">
    <div class="breadcrumb d-flex justify-between align-center">
      <span>Settings</span>
      <button type="button" class="btn btn-hidden">Hidden</button>
    </div>
    <transition name="fade" mode="out-in" appear>
      <div class="container-fluid h-100">
        <div class="row h-100">
          <div class="col col-3 pa-0 h-100 settings__nav--col">
            <div class="settings__nav h-100 py-1">
              <ul>
                <li
                  class="d-flex align-center py-1 mb-1"
                  @click="currentComponent = 'ChangePassword'"
                  :class="{
                    'nav__item--active': currentComponent === 'ChangePassword',
                  }"
                >
                  <i class="fas fa-lock d-flex justify-center ml-1"></i>
                  <span class="ml-3">Change Password</span>
                </li>
                <li
                  class="d-flex align-center py-1"
                  @click="currentComponent = 'RegisterUser'"
                  :class="{
                    'nav__item--active': currentComponent === 'RegisterUser',
                  }"
                >
                  <i class="fas fa-user d-flex justify-center ml-1"></i>
                  <span class="ml-3">Register User</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col col-9 settings__content--col">
            <div class="settings__content pa-2">
              <keep-alive>
                <transition name="fade" mode="out-in" appear>
                  <component :is="currentComponent"></component>
                </transition>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ChangePassword from "@/components/Admin/Settings/ChangePassword";
import RegisterUser from "@/components/Admin/Settings/RegisterUser";

export default {
  name: "Settings",
  components: {
    ChangePassword,
    RegisterUser,
  },
  data() {
    return {
      currentComponent: "ChangePassword",
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

.settings__nav--col {
  .settings__nav {
    @include respondMobile(medium) {
      height: auto;
      border-bottom: 1px solid #e0e0e0;
      border-right: none;
    }
  }

  @include respondMobile(medium) {
    flex: 0 0 calc(100%);
    height: auto;
  }
}

.settings__content--col {
  @include respondMobile(medium) {
    flex: 0 0 calc(100%);
    height: 100%;
  }
}

.nav__item--active {
  color: var(--color-theme);

  &::before {
    background-color: var(--color-theme);
    opacity: 0.12 !important;
  }
}
</style>
