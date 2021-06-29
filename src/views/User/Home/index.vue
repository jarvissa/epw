<template>
  <div class="container home mb-10">
    <SubHeader
      :title="`Hi, I'm Emin.`"
      :description="`I'm a student at ADA University studying Information Technology.`"
    />
    <Projects />
  </div>
</template>

<script>
import SubHeader from "@/components/User/SubHeader";
import Projects from "@/components/User/Home/Projects";

export default {
  name: "Home",
  components: {
    SubHeader,
    Projects,
  },
};
</script>
