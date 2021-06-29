<template>
  <div id="app">
    <Loading :show="returnLoadingState" />
    <notifications position="top right" />
    <AdminHeader v-if="currentRoute !== 'Error404' && isAdminRoute" />
    <UserHeader v-else />
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
    <Footer />
  </div>
</template>

<script>
import UserHeader from "@/components/User/Header";
import AdminHeader from "@/components/Admin/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

import { mapGetters } from "vuex";

export default {
  components: {
    UserHeader,
    AdminHeader,
    Footer,
    Loading,
  },
  computed: {
    ...mapGetters(["returnLoadingState"]),
    currentRoute() {
      return this.$route.name;
    },
    isAdminRoute() {
      return this.$route.path.includes("admin");
    },
  },
};
</script>

<style lang="scss">
@use "./assets/sass/main";

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
