<template>
  <div class="container about mb-10">
    <SubHeader :title="`Hi, I'm Emin.`" />
    <div class="row">
      <div class="col col-6 d-flex justify-center">
        <img
          src="@/assets/images/about.jpg"
          alt="my personal image"
          class="about__image"
        />
      </div>
      <div class="col col-6">
        <div class="about__content">
          <h2 class="my-2">About Me</h2>
          <p>
            Hello! I’m a student at ADA University studying Information
            Technology. I am interested in
            <span class="link link__active">web dev, </span>
            <span class="link link__active">mathematics, </span> and
            <span class="link link__active">cybersecurity.</span>
          </p>
          <br />
          <p>
            Over the years, I have continuously educated and developed myself to
            pursue a career in software development. I have worked as a remote
            frontend developer at
            <a href="https://schools.easy.edu.az/" class="link link__active"
              >Easy Education Project.</a
            >
            Currently, I intern at
            <a href="https://atltech.az/" class="link link__active">ATL Tech</a>
            as a frontend developer.
          </p>
          <br />
          <h2 class="my-2">Contact</h2>
          <div class="social">
            <a
              href="mailto:ealiyev12125@ada.edu.az"
              class="social__link--email"
            >
              <i class="fas fa-envelope"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100066303174318"
              class="social__link--facebook"
            >
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://github.com/jarvissa" class="social__link--github">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from "@/components/User/SubHeader";

export default {
  name: "About",
  components: {
    SubHeader,
  },
};
</script>
