<template>
  <div class="container mb-10">
    <SubHeader :title="`Blog`" />
    <Blogs />
  </div>
</template>

<script>
import SubHeader from "@/components/User/SubHeader";
import Blogs from "@/components/User/Blog/Blogs";

export default {
  name: "Blog",
  components: {
    SubHeader,
    Blogs,
  },
};
</script>
