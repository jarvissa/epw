<template>
  <footer class="footer pa-1">
    <button @click="changeColorTheme"></button>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      colors: [
        "rgb(62, 147, 205)",
        "rgb(57, 181, 74)",
        "rgb(215, 71, 36)",
        "rgb(252, 173, 33)",
      ],
      currentColor: 0,
    };
  },
  methods: {
    changeColorTheme() {
      this.currentColor++;
      if (this.currentColor === this.colors.length) this.currentColor = 0;

      document.documentElement.style.setProperty(
        "--color-theme",
        this.colors[this.currentColor]
      );
    },
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
};
</script>
