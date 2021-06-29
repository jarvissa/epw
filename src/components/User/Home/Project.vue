<template>
  <div
    class="home-project mb-3"
    :data-content="description"
    :style="returnHomeProjectStyle"
  >
    <h1 class="home-project__title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "HomeProject",
  props: ["title", "description", "imgSrc"],
  computed: {
    returnHomeProjectStyle() {
      return `
        background-image: url("${this.imgSrc}");
      `;
    },
  },
};
</script>
