<template>
  <v-form>
    <p style="margin-bottom: 10px">Pytanie:</p>
    <ckeditor
      :editor="editor"
      v-model="question"
      @input="this.$emit('question', this.question)"
    />
    <p style="margin-bottom: 10px; margin-top: 10px">Odpowiedź:</p>
    <v-text-field
      v-model="answer"
      label="Odpowiedź"
      required
      @input="this.$emit('answer', this.answer)"
    ></v-text-field>
  </v-form>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "NewQuestionForm",
  data() {
    return {
      editor: ClassicEditor,
      question: "",
      answer: "",
    };
  },
};
</script>

<style scoped></style>
