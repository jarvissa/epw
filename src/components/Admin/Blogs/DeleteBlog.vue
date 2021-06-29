<template>
  <modal name="delete-blog" adaptive width="300" height="auto">
    <div class="delete-blog d-flex flex-column align-center px-3 py-3">
      <h1 class="mb-2">Delete blog</h1>
      <p class="mb-2">Are you sure want to delete this blog?</p>
      <div class="delete-blog__actions d-flex">
        <button type="button" class="btn btn-error" @click="hideModal">
          Close
        </button>
        <button type="button" class="btn btn-text" @click="deleteBlog">
          Confirm
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import blogService from "@/services/blogService";
import { eventBus } from "@/main";
import { mapActions } from "vuex";

export default {
  name: "DeleteBlog",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    hideModal() {
      this.$modal.hide("delete-blog");
    },
    deleteBlog() {
      blogService
        .deleteBlog(this.id)
        .then(() => {
          eventBus.$emit("deleteBlogReverse", this.id);
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "An error occurred while deleting the blog!",
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
    eventBus.$on("deleteBlog", (id) => {
      this.id = id;
    });
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

.delete-blog {
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
