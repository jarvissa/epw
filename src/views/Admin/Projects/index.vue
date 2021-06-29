<template>
  <div class="admin-projects">
    <div class="breadcrumb d-flex justify-between align-center">
      <span>Projects</span>
      <button type="button" class="btn btn-primary" @click="addProjectModal">
        Add project
      </button>
    </div>
    <Projects />
    <AddProject />
    <DeleteProject />
  </div>
</template>

<script>
import Projects from "@/components/Admin/Projects/Projects";
import AddProject from "@/components/Admin/Projects/AddProject";
import DeleteProject from "@/components/Admin/Projects/DeleteProject";

export default {
  components: {
    Projects,
    AddProject,
    DeleteProject,
  },
  methods: {
    addProjectModal() {
      this.$modal.show("add-project");
    },
  },
};
</script>
