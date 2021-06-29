<template>
  <modal
    name="add-blog"
    scrollable
    height="auto"
    @before-close="
      resetForm();
      edit = false;
    "
  >
    <ValidationObserver ref="form" tag="div" v-slot="{ handleSubmit }">
      <form enctype="multipart/form-data" class="d-flex flex-column px-6 py-3">
        <h1 class="mb-2 align-self-center">
          {{ edit ? "Edit blog" : "Add blog" }}
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
        <div class="input-control mb-2" style="font-size: 1.5rem">
          <ckeditor
            :editor="editor"
            :config="editorConfig"
            v-model="editorData"
          ></ckeditor>
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
import blogService from "@/services/blogService";
import { mapActions } from "vuex";
import { eventBus } from "@/main";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "AddBlog",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      edit: false,
      id: "",
      title: "",
      created: null,
      image: "",
      oldImage: "",
      fileName: null,
      editor: ClassicEditor,
      editorConfig: {
        cloudServices: {
          uploadUrl: "https://81610.cke-cs.com/easyimage/upload/",
          tokenUrl:
            "https://81610.cke-cs.com/token/dev/4f71a7a5ec02e3d26f407ff8cff225f4df40a79672fec00f84936a3d6582",
        },
      },
      editorData: "",
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    hideModal() {
      this.$modal.hide("add-blog");
    },
    submit() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("created", new Date());
      formData.append("text", this.editorData);
      formData.append("image", this.image);

      if (!this.edit) {
        blogService
          .addBlog(formData)
          .then((res) => {
            eventBus.$emit("addBlog", res);
          })
          .catch(() => {
            this.$notify({
              title: "Error",
              text: "An error occurred while adding the blog!",
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

        blogService
          .editBlog(this.id, formData)
          .then((res) => {
            eventBus.$emit("editBlogReverse", res);
          })
          .catch(() => {
            this.$notify({
              title: "Error",
              text: "An error occurred while updating the blog!",
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
      this.editorData = "";
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
    eventBus.$on("editBlog", ({ _id, title, text, image }) => {
      this.edit = true;

      this.id = _id;
      this.title = title;
      this.editorData = text;
      this.image = image;
      this.oldImage = image;
      this.fileName = image;
    });
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/abstracts" as *;

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

    &:focus {
      border-color: var(--color-theme);
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
