<template>
  <div class="loading-wrapper" v-if="show">
    <swapping-squares-spinner
      :animation-duration="1000"
      :size="65"
      color="var(--color-theme)"
    />
  </div>
</template>

<script>
import { SwappingSquaresSpinner } from "epic-spinners";

export default {
  name: "Loading",
  components: {
    SwappingSquaresSpinner,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.8);

  .swapping-squares-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
