<template>
  <div>
    <h1 class="title mb-3">Change Password</h1>
    <div class="row" v-if="returnUser">
      <div class="col col-6">
        <ValidationObserver ref="form" slim v-slot="{ handleSubmit }">
          <form ref="form" @submit.prevent="handleSubmit(changePassword)">
            <div class="input-control mb-2">
              <input
                type="text"
                placeholder="Username"
                class="input-control__text px-1"
                v-model="returnUser.username"
                disabled
              />
            </div>

            <div class="input-control mb-2">
              <ValidationProvider
                name="current password"
                rules="required|min:6"
                v-slot="{ errors }"
                tag="div"
              >
                <input
                  type="password"
                  placeholder="Current password"
                  class="input-control__text px-1"
                  v-model="currentPassword"
                />
                <span class="error-text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="input-control mb-2">
              <ValidationProvider
                name="new password"
                rules="required|min:6|confirmed:confirmation"
                v-slot="{ errors }"
                tag="div"
              >
                <input
                  type="password"
                  placeholder="New password"
                  class="input-control__text px-1"
                  v-model="newPassword"
                />
                <span class="error-text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="input-control mb-2">
              <ValidationProvider
                name="confirmation"
                rules="required|min:6"
                vid="confirmation"
                v-slot="{ errors }"
                tag="div"
              >
                <input
                  type="password"
                  placeholder="Confirm new password"
                  class="input-control__text px-1"
                  v-model="confirmNewPassword"
                />
                <span class="error-text">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="input-control mt-3">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapGetters, mapActions } from "vuex";
import authService from "@/services/authService";

export default {
  name: "ChangePassword",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  },
  computed: {
    ...mapGetters(["returnUser"]),
  },
  methods: {
    ...mapActions(["setUser", "changeLoadingState"]),
    resetForm() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";

      this.$refs.form.reset();
    },
    changePassword() {
      authService
        .changePassword(
          this.returnUser.username,
          this.currentPassword,
          this.newPassword
        )
        .then((res) => {
          const { user, token } = res;
          this.setUser({ user, token });

          this.$notify({
            title: "Password changed",
            text: "The password was changed successfully!",
            type: "success",
            duration: 3000,
          });
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "An error occurred while updating the password!",
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
