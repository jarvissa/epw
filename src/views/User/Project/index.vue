<template>
  <div class="container project mb-10" v-if="!checkIfProjectIsEmpty">
    <SubHeader :title="project.title" />
    <div class="row">
      <div class="col col-6 d-flex justify-center">
        <img
          :src="`../${project.image}`"
          alt="Project image"
          class="project__image"
        />
      </div>
      <div class="col col-6">
        <div class="project__content">
          <h2 class="my-2">Description</h2>
          <p>{{ project.description }}</p>
          <h2 class="my-2">Tags</h2>
          <div class="tags d-flex flex-wrap">
            <div class="tag" v-for="tag in project.tags" :key="tag">
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from "@/components/User/SubHeader";
import projectService from "@/services/projectService";

import { mapActions } from "vuex";

export default {
  name: "Project",
  components: {
    SubHeader,
  },
  data() {
    return {
      project: {},
    };
  },
  computed: {
    checkIfProjectIsEmpty() {
      for (let i in this.project) return false;
      return true;
    },
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
  },
  created() {
    const projectId = this.$route.params.id;

    projectService
      .getSingleProject(projectId)
      .then((res) => {
        this.project = res;
      })
      .catch(() => {
        this.$router.push({ name: "UserHome" });
      })
      .finally(() => {
        this.changeLoadingState();
      });
  },
};
</script>

<style></style>
