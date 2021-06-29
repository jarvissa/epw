<template>
  <div class="row subheader flex-column justify-center align-center py-12">
    <div class="d-flex align-center">
      <h1
        class="subheader__title mb-2"
        :class="{
          'link link__active link__project': currentRoute === 'Project',
        }"
      >
        {{ title }}
      </h1>
      <i
        class="fas fa-link link-icon ml-1"
        v-if="currentRoute === 'Project'"
      ></i>
    </div>
    <p v-if="description" class="subheader__description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "SubHeader",
  props: ["title", "description"],
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss">
.link__project {
  &::after {
    border-bottom: 5px solid var(--color-theme);
  }
}

.link-icon {
  color: var(--color-theme);
  font-size: 1.8rem;
  transition: all 0.3s ease;
}
</style>
