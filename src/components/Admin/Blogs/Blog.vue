<template>
  <div class="admin-blog d-flex flex-column">
    <img :src="imgSrc" alt="blog thumbnail" class="admin-blog__image" />
    <div class="admin-blog__title pa-1">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog",
  props: ["title", "imgSrc"],
};
</script>

<style></style>
