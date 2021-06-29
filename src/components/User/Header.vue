<template>
  <header class="header py-1 px-4">
    <div class="container-fluid">
      <div class="row">
        <div class="col col-12">
          <nav class="navbar">
            <ul class="d-flex justify-between align-center">
              <li>
                <router-link
                  to="/blog"
                  class="link link__blog"
                  exact-active-class="link__active"
                  >Blog</router-link
                >
              </li>
              <li>
                <router-link
                  to="/"
                  class="link link__home"
                  exact-active-class="link__active"
                  >Emin A.</router-link
                >
              </li>
              <li>
                <router-link
                  to="/about"
                  class="link link__about"
                  exact-active-class="link__active"
                  >About</router-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "UserHeader",
};
</script>
