<template>
  <div class="container blog-post mb-10" v-if="!checkIfBlogIsEmpty">
    <SubHeader :title="blog.title" />
    <div class="blog-post__content">
      <p class="blog-post__date mb-2">
        Published on {{ formatDate(blog.created) }}
      </p>
      <div class="blog-post__image d-flex justify-center mb-5">
        <img :src="`../${blog.image}`" alt="" />
      </div>
      <div class="blog-post__text" v-html="blog.text"></div>
    </div>
  </div>
</template>

<script>
import SubHeader from "@/components/User/SubHeader";
import blogService from "@/services/blogService";
import { format } from "date-fns";

import { mapActions } from "vuex";

export default {
  name: "BlogPost",
  components: {
    SubHeader,
  },
  data() {
    return {
      blog: {},
    };
  },
  computed: {
    checkIfBlogIsEmpty() {
      for (let i in this.blog) return false;
      return true;
    },
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    formatDate(date) {
      return format(new Date(date), "MMMM d, yyyy");
    },
  },
  created() {
    const blogId = this.$route.params.id;

    blogService
      .getSingleBlog(blogId)
      .then((res) => {
        this.blog = res;
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
