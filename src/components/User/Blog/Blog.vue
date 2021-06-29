<template>
  <div class="blog mb-3">
    <img :src="imgSrc" alt="blog thumbnail" class="blog__image" />
    <div class="blog__title pa-1">
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
