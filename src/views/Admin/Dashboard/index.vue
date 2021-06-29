<template>
  <div class="dashboard">
    <div class="breadcrumb d-flex justify-between align-center">
      <span>Dashboard</span>
      <button type="button" class="btn btn-hidden">Hidden</button>
    </div>

    <transition name="fade" mode="out-in" appear>
      <div class="container py-4" v-if="res">
        <div class="row">
          <div class="col col-3" v-for="(item, i) in res" :key="i">
            <div
              class="card px-2 py-4 d-flex justify-between align-center mb-3"
              :style="cardColor(item.value)"
            >
              <div>
                <div class="card-title">
                  {{ item.value.count }}
                </div>
                <div class="card-subtitle">
                  {{ item.value.description }}
                </div>
              </div>
              <div class="card-actions">
                <i :class="item.value.icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import dashboardService from "@/services/dashboardService";
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      res: null,
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    handleDashboardRequests() {
      this.changeLoadingState();

      Promise.allSettled([
        dashboardService.getUsersCount(),
        dashboardService.getProjectsCount(),
        dashboardService.getBlogsCount(),
      ])
        .then((res) => {
          this.res = res.filter((item) => item.status === "fulfilled");
        })
        .finally(() => {
          this.changeLoadingState();
        });
    },
    cardColor({ color }) {
      return `background-color: ${color}`;
    },
  },
  created() {
    this.handleDashboardRequests();
  },
};
</script>

<style lang="scss" scoped></style>
