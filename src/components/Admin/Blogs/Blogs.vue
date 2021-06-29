<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container py-4">
      <div class="row" v-if="!checkIfBlogsAreEmpty">
        <div
          class="col col-3 d-flex flex-column mb-2"
          v-for="blog in blogs"
          :key="blog._id"
        >
          <Blog :title="blog.title" :imgSrc="`../${blog.image}`" />
          <div class="blog-handler d-flex justify-end">
            <i class="fas fa-eye" @click="showBlog(blog._id)"></i>
            <i class="fas fa-edit" @click="addBlogModal(blog)"></i>
            <i class="fas fa-trash" @click="deleteBlog(blog._id)"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import blogService from "@/services/blogService";
import Blog from "./Blog";
import { mapActions } from "vuex";
import { eventBus } from "@/main";

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
      const route = this.$router.resolve({ path: `/blog/${id}` });
      window.open(route.href, "_blank");
    },
    deleteBlog(id) {
      this.$modal.show("delete-blog");
      eventBus.$emit("deleteBlog", id);
    },
    findBlogById(id) {
      return this.blogs.findIndex((blog) => blog._id === id);
    },
    addBlogModal(blog) {
      this.$modal.show("add-blog");
      eventBus.$emit("editBlog", blog);
    },
  },
  created() {
    eventBus.$on("addBlog", (blog) => {
      this.blogs.push(blog);

      this.$notify({
        title: "Blog added",
        text: "The blog was added succesfully!",
        type: "success",
        duration: 3000,
      });
    });

    eventBus.$on("deleteBlogReverse", (id) => {
      const index = this.findBlogById(id);
      this.blogs.splice(index, 1);

      this.$notify({
        title: "Blog deleted",
        text: "The blog was deleted succesfully!",
        type: "success",
        duration: 3000,
      });
    });

    eventBus.$on("editBlogReverse", (blog) => {
      const index = this.findBlogById(blog._id);
      this.blogs.splice(index, 1, blog);

      this.$notify({
        title: "Blog updated",
        text: "The blog was updated succesfully!",
        type: "success",
        duration: 3000,
      });
    });

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

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

.col {
  @include respondMobile(small) {
    align-items: center;
  }
}

.col-3 {
  @include respondSpecific(992px, 1200px) {
    flex: 0 0 calc(100% / 3);
  }
}

.blog-handler {
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

  @include respondSpecific(576px, 768px) {
    width: 90%;
  }

  @include respondMobile(x-small) {
    width: 80%;
  }
}
</style>
