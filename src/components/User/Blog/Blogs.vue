<template>
  <transition name="fade" mode="out-in" appear>
    <div class="row" v-if="!checkIfBlogsAreEmpty">
      <div
        class="col col-4 d-flex justify-center"
        v-for="blog in blogs"
        :key="blog._id"
      >
        <Blog
          :title="blog.title"
          :imgSrc="blog.image"
          @click.native="showBlog(blog._id)"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import blogService from "@/services/blogService";
import Blog from "./Blog";

import { mapActions } from "vuex";

export default {
  name: "Blogs",
  components: {
    Blog,
  },
  data() {
    return {
      blogs: [],
    };
  },
  computed: {
    checkIfBlogsAreEmpty() {
      return this.blogs.length === 0 ? true : false;
    },
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    showBlog(id) {
      this.$router.push(`/blog/${id}`);
    },
  },
  created() {
    blogService
      .getBlogs()
      .then((res) => {
        this.blogs = res;
      })
      .catch(() => {
        this.$notify({
          title: "Error",
          text: "An error occurred while fetching the blogs!",
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
