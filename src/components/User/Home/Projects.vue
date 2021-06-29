<template>
  <transition name="fade" mode="out-in" appear>
    <div class="row" v-if="!checkIfProjectsAreEmpty">
      <div
        class="col col-4 d-flex justify-center"
        v-for="project in projects"
        :key="project._id"
      >
        <Project
          :title="project.title"
          :description="project.shortDescription"
          :imgSrc="project.image"
          @click.native="showProject(project._id)"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import projectService from "@/services/projectService";
import Project from "./Project";

import { mapActions } from "vuex";

export default {
  name: "Projects",
  components: {
    Project,
  },
  data() {
    return {
      projects: [],
    };
  },
  computed: {
    checkIfProjectsAreEmpty() {
      return this.projects.length === 0 ? true : false;
    },
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    showProject(id) {
      this.$router.push(`/projects/${id}`);
    },
  },
  created() {
    projectService
      .getProjects()
      .then((res) => {
        this.projects = res;
      })
      .catch(() => {
        this.$notify({
          title: "Error",
          text: "An error occurred while fetching the projects!",
          type: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        this.changeLoadingState();
      });
  },
};
</script>
