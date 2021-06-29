<template>
  <div
    class="admin-project"
    :data-content="description"
    :style="returnHomeProjectStyle"
  >
    <h1 class="admin-project__title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "AdminProject",
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
