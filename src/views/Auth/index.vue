<template>
  <div class="container-fluid login d-flex justify-center align-center py-5">
    <div class="login__wrapper my-4 pa-6">
      <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit }">
        <form
          class="login__form d-flex flex-column justify-center align-center"
          @submit.prevent="handleSubmit(login)"
        >
          <span class="login__form--title"> Account Login </span>
          <div class="input__wrapper input__wrapper--username mb-2">
            <ValidationProvider
              name="username"
              rules="required|min:4"
              v-slot="{ errors }"
              tag="div"
            >
              <input
                type="text"
                class="login__form--input"
                placeholder="Username"
                v-model="username"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="input__wrapper input__wrapper--password mb-2">
            <ValidationProvider
              name="password"
              rules="required|min:6"
              v-slot="{ errors }"
              tag="div"
            >
              <input
                type="password"
                class="login__form--input"
                placeholder="Password"
                v-model="password"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="button__wrapper">
            <button type="submit" class="login__form--button">Login</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import authService from "@/services/authService";
import { mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["setUser", "changeLoadingState"]),
    login() {
      authService
        .login(this.username, this.password)
        .then((res) => {
          const { user, token } = res;

          this.setUser({ user, token });
          this.$router.push("/admin");
        })
        .catch(({ errors }) => {
          this.$refs.form.setErrors(errors);
        })
        .finally(() => {
          this.changeLoadingState();
        });
    },
  },
};
</script>
