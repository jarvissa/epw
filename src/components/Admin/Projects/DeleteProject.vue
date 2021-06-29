<template>
  <modal name="delete-project" adaptive width="300" height="auto">
    <div class="delete-project d-flex flex-column align-center px-3 py-3">
      <h1 class="mb-2">Delete project</h1>
      <p class="mb-2">Are you sure want to delete this project?</p>
      <div class="delete-project__actions d-flex">
        <button type="button" class="btn btn-error" @click="hideModal">
          Close
        </button>
        <button type="button" class="btn btn-text" @click="deleteProject">
          Confirm
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import projectService from "@/services/projectService";
import { eventBus } from "@/main";
import { mapActions } from "vuex";

export default {
  name: "DeleteProject",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    hideModal() {
      this.$modal.hide("delete-project");
    },
    deleteProject() {
      projectService
        .deleteProject(this.id)
        .then(() => {
          eventBus.$emit("deleteProjectReverse", this.id);
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "An error occurred while deleting the project!",
            type: "error",
            duration: 3000,
          });
        })
        .finally(() => {
          this.hideModal();
          this.changeLoadingState();
        });
    },
  },
  created() {
    eventBus.$on("deleteProject", (id) => {
      this.id = id;
    });
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

.delete-project {
  h1,
  p {
    color: $color-primary;
  }

  p {
    font-size: 1.6rem;
  }

  .btn-text {
    color: rgb(62, 147, 205);

    &::before {
      background-color: rgb(62, 147, 205);
    }
  }
}
</style>
