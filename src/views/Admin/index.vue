<template>
  <div class="container-fluid admin" @click="handleClick">
    <div class="row">
      <div class="col col-2 px-0 admin__nav">
        <NavigationDrawer />
      </div>
      <div class="col col-10 admin__content px-0">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationDrawer from "@/components/Admin/NavigationDrawer";
import { eventBus } from "@/main";

export default {
  components: {
    NavigationDrawer,
  },
  methods: {
    handleClick(e) {
      e.stopPropagation();

      const res = Array.from(e.target.classList).includes("navigation-drawer");
      eventBus.$emit("clickOutside", !res);
    },
  },
};
</script>
