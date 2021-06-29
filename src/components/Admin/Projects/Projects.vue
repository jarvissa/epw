<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container py-4">
      <div class="row" v-if="!checkIfProjectsAreEmpty">
        <div
          class="col col-4 d-flex flex-column mb-2"
          v-for="project in projects"
          :key="project._id"
        >
          <Project
            :title="project.title"
            :description="project.shortDescription"
            :imgSrc="`../${project.image}`"
          />
          <div class="project-handler d-flex justify-end">
            <i class="fas fa-eye" @click="showProject(project._id)"></i>
            <i class="fas fa-edit" @click="addProjectModal(project)"></i>
            <i class="fas fa-trash" @click="deleteProject(project._id)"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import projectService from "@/services/projectService";
import Project from "./Project";
import { mapActions } from "vuex";
import { eventBus } from "@/main";

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
      const route = this.$router.resolve({ path: `/projects/${id}` });
      window.open(route.href, "_blank");
    },
    deleteProject(id) {
      this.$modal.show("delete-project");
      eventBus.$emit("deleteProject", id);
    },
    findProjectById(id) {
      return this.projects.findIndex((project) => project._id === id);
    },
    addProjectModal(project) {
      this.$modal.show("add-project");
      eventBus.$emit("editProject", project);
    },
  },
  created() {
    eventBus.$on("addProject", (project) => {
      this.projects.push(project);

      this.$notify({
        title: "Project added",
        text: "The project was added succesfully!",
        type: "success",
        duration: 3000,
      });
    });

    eventBus.$on("deleteProjectReverse", (id) => {
      const index = this.findProjectById(id);
      this.projects.splice(index, 1);

      this.$notify({
        title: "Project deleted",
        text: "The project was deleted succesfully!",
        type: "success",
        duration: 3000,
      });
    });

    eventBus.$on("editProjectReverse", (project) => {
      const index = this.findProjectById(project._id);
      this.projects.splice(index, 1, project);

      this.$notify({
        title: "Project updated",
        text: "The project was updated succesfully!",
        type: "success",
        duration: 3000,
      });
    });

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

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

.col {
  @include respondMobile(small) {
    align-items: center;
  }
}

.project-handler {
  padding: 1.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 5px 5px;

  i {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;

    &:first-child {
      margin-right: auto;
    }

    &:not(:first-child) {
      margin-left: 1rem;
    }

    &:first-child:hover {
      color: rgb(62, 147, 205);
    }

    &:nth-child(2):hover {
      color: rgb(57, 181, 74);
    }

    &:last-child:hover {
      color: rgb(215, 71, 36);
    }
  }

  @include respondMobile(small) {
    width: 80%;
  }
}
</style>
