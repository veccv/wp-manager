<template>
  <ckeditor :editor="editor" v-model="editorData" />
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "TestView",
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
    };
  },
};
</script>

<style scoped></style>
