<template>
  <div>
    <h1 class="title mb-3">Register User</h1>
    <div class="row">
      <div class="col col-6">
        <ValidationObserver ref="form" slim v-slot="{ handleSubmit }">
          <form ref="form" @submit.prevent="handleSubmit(register)">
            <div class="input-control mb-2">
              <ValidationProvider
                name="username"
                rules="required|min:4"
                v-slot="{ errors }"
                tag="div"
              >
                <input
                  type="text"
                  placeholder="Username"
                  class="input-control__text px-1"
                  v-model="username"
                />
                <span class="error-text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="input-control mb-2">
              <ValidationProvider
                name="password"
                rules="required|min:6|confirmed:confirmation"
                v-slot="{ errors }"
                tag="div"
              >
                <input
                  type="password"
                  placeholder="Password"
                  class="input-control__text px-1"
                  v-model="password"
                />
                <span class="error-text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="input-control mb-2">
              <ValidationProvider
                name="confirmation"
                rules="required|min:6"
                v-slot="{ errors }"
                tag="div"
              >
                <input
                  type="password"
                  placeholder="Confirm password"
                  class="input-control__text px-1"
                  v-model="confirmPassword"
                />
                <span class="error-text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="input-control mt-3">
              <button type="submit" class="btn btn-primary">Register</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapActions } from "vuex";
import authService from "@/services/authService";

export default {
  name: "RegisterUser",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    resetForm() {
      this.username = "";
      this.password = "";
      this.confirmPassword = "";

      this.$refs.form.reset();
    },
    register() {
      authService
        .register(this.username, this.password)
        .then(() => {
          this.$notify({
            title: "User registered",
            text: "The user was registered successfully!",
            type: "success",
            duration: 3000,
          });
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "An error occurred while registering the user!",
            type: "error",
            duration: 3000,
          });
        })
        .finally(() => {
          this.resetForm();
          this.changeLoadingState();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

.title {
  color: $color-primary;
}

.input-control {
  position: relative;

  &__text {
    width: 100%;
    height: 4rem;
    font-family: $font-family;
    font-size: 1.5rem;
    margin-bottom: 0.2rem;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
    transition: all 0.3s ease;

    &:not(:disabled) {
      background: transparent;
    }

    &:focus {
      border-color: var(--color-theme);
    }
  }

  .btn-text {
    color: rgb(62, 147, 205);

    &::before {
      background-color: rgb(62, 147, 205);
    }
  }

  .error-text {
    color: #f44336;
    font-size: 1.2rem;
  }
}
</style>
