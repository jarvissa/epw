<template>
  <div class="admin-blogs">
    <div class="breadcrumb d-flex justify-between align-center">
      <span>Blogs</span>
      <button type="button" class="btn btn-primary" @click="addBlogModal">
        Add blog
      </button>
    </div>
    <Blogs />
    <AddBlog />
    <DeleteBlog />
  </div>
</template>

<script>
import Blogs from "@/components/Admin/Blogs/Blogs";
import AddBlog from "@/components/Admin/Blogs/AddBlog";
import DeleteBlog from "@/components/Admin/Blogs/DeleteBlog";

export default {
  components: {
    Blogs,
    AddBlog,
    DeleteBlog,
  },
  methods: {
    addBlogModal() {
      this.$modal.show("add-blog");
    },
  },
};
</script>
