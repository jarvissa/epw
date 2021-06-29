<template>
  <modal
    name="add-project"
    adaptive
    height="auto"
    @before-close="
      resetForm();
      edit = false;
    "
  >
    <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit, errors }">
      <form enctype="multipart/form-data" class="d-flex flex-column px-6 py-3">
        <h1 class="mb-2 align-self-center form-title">
          {{ edit ? "Edit project" : "Add project" }}
        </h1>
        <div class="input-control mb-2">
          <ValidationProvider
            name="title"
            rules="required"
            v-slot="{ errors }"
            tag="div"
          >
            <input
              type="text"
              placeholder="Title"
              class="input-control__text px-1"
              v-model="title"
            />
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-control mb-2">
          <ValidationProvider
            name="short description"
            rules="required"
            v-slot="{ errors }"
            tag="div"
          >
            <input
              type="text"
              placeholder="Short description"
              class="input-control__text px-1"
              v-model="shortDescription"
            />
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-control mb-2">
          <ValidationProvider
            class="d-flex flex-column"
            name="description"
            rules="required"
            v-slot="{ errors }"
            tag="div"
          >
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
              class="input-control__textarea pa-1"
              v-model="description"
            ></textarea>
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-control mb-2">
          <div class="input-control__tags pa-1">
            <div class="input-control__tag" v-for="tag in tags" :key="tag">
              <span>{{ tag }}</span>
              <div class="close" @click="removeTag(tag)">
                <i class="fas fa-times-circle"></i>
              </div>
            </div>
            <ValidationProvider name="tags" vid="tags" rules="tags" slim>
              <input
                type="text"
                placeholder="Enter a tag"
                v-model="tag"
                @keyup="enterTag"
              />
            </ValidationProvider>
          </div>
          <span class="error-text" v-if="errors['tags']">{{
            errors["tags"][0]
          }}</span>
        </div>
        <div class="input-control align-self-center">
          <label for="image" class="input-control__file--trigger">
            {{ fileName ? truncatedFileName : "Select an image" }}
          </label>
          <ValidationProvider
            name="image"
            :rules="edit ? 'image' : 'required|image'"
            ref="provider"
            v-slot="{ errors }"
            tag="div"
          >
            <input
              type="file"
              accept="image/*"
              class="input-control__file"
              id="image"
              @change="handleImageUpload"
            />
            <span class="error-text">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-control d-flex align-self-end mt-3">
          <button type="button" class="btn btn-error" @click="hideModal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-text"
            @click="handleSubmit(submit)"
          >
            Submit
          </button>
        </div>
      </form>
    </ValidationObserver>
  </modal>
</template>

<script>
import projectService from "@/services/projectService";
import { mapActions } from "vuex";
import { eventBus } from "@/main";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

export default {
  name: "AddProject",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      edit: false,
      id: "",
      title: "",
      shortDescription: "",
      description: "",
      tags: [],
      tag: "",
      image: "",
      oldImage: "",
      fileName: null,
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    enterTag(e) {
      if (
        e.key === "Enter" &&
        this.tag.trim().length > 0 &&
        !this.tags.includes(this.tag)
      ) {
        this.tags.push(this.tag);
        this.tag = "";
      }
    },
    removeTag(removable) {
      this.tags = this.tags.filter((tag) => tag !== removable);
    },
    hideModal() {
      this.$modal.hide("add-project");
    },
    submit() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("shortDescription", this.shortDescription);
      formData.append("description", this.description);

      for (let tag of this.tags) {
        formData.append("tags", tag);
      }

      formData.append("image", this.image);

      if (!this.edit) {
        projectService
          .addProject(formData)
          .then((res) => {
            eventBus.$emit("addProject", res);
          })
          .catch(() => {
            this.$notify({
              title: "Error",
              text: "An error occurred while adding the project!",
              type: "error",
              duration: 3000,
            });
          })
          .finally(() => {
            this.hideModal();
            this.resetForm();
            this.changeLoadingState();
          });
      } else {
        formData.append("oldImage", this.oldImage);

        projectService
          .editProject(this.id, formData)
          .then((res) => {
            eventBus.$emit("editProjectReverse", res);
          })
          .catch(() => {
            this.$notify({
              title: "Error",
              text: "An error occurred while updating the project!",
              type: "error",
              duration: 3000,
            });
          })
          .finally(() => {
            this.hideModal();
            this.changeLoadingState();
          });
      }
    },
    async handleImageUpload(e) {
      this.image = "";
      this.fileName = null;

      const res = await this.$refs.provider.validate(e);
      const input = document.querySelector("#image");

      if (res) {
        this.image = input.files[0];
        this.fileName = input.files[0].name;
      }
    },
    resetForm() {
      this.title = "";
      this.shortDescription = "";
      this.description = "";
      this.tags = [];
      this.tag = "";
      this.image = "";
      this.fileName = null;
    },
  },
  computed: {
    truncatedFileName() {
      return this.fileName.trim().slice(0, 10) + "...";
    },
  },
  created() {
    eventBus.$on(
      "editProject",
      ({ _id, title, shortDescription, description, tags, image }) => {
        this.edit = true;

        this.id = _id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.description = description;
        this.tags = tags;
        this.image = image;
        this.oldImage = image;
        this.fileName = image;
      }
    );

    extend("tags", {
      validate: () => {
        return this.tags.length > 0;
      },
      message: "The tags field requires at least one tag",
    });
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

.form-title {
  color: $color-primary;
}

.input-control {
  position: relative;

  &__text,
  &__textarea {
    width: 100%;
    height: 4rem;
    font-family: $font-family;
    font-size: 1.5rem;
    margin-bottom: 0.2rem;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: var(--color-theme);
    }
  }

  &__textarea {
    height: 8rem;
    border: 1px solid #e0e0e0;
    transition: border-color 0.3s ease;
  }

  &__tags {
    width: 100%;
    font-size: 1.5rem;
    border: 1px solid #e0e0e0;
    font-family: $font-family;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    transition: all 0.3s ease;

    input {
      font-family: $font-family;
      font-size: 1.5rem;
      flex: 1;
      border: none;
      outline: none;
    }

    &:focus-within {
      border: 1px solid var(--color-theme);
    }
  }

  &__tag {
    background-color: var(--color-theme);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 1.5rem;
    display: flex;
    transition: all 0.3s ease;

    .close {
      margin-left: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  &__file {
    display: none;
    position: absolute;
    inset: 0;
    cursor: pointer;

    &--trigger {
      display: block;
      background-color: var(--color-theme);
      color: #fff;
      font-size: 1.5rem;
      margin-bottom: 0.2rem;
      padding: 1rem 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
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
