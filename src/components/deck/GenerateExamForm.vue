<template>
  <v-form>
    <p style="margin-bottom: 10px; margin-top: 10px">Ilość zadań: (max: {{questions.length}})</p>
    <v-text-field
        v-model="amountOfQuestions"
        label="Wprowadź ilość"
        required
        @input="$emit('set-questions', amountOfQuestions)"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "GenerateExamForm",
  props: {
    questions: Array,
  },
  data() {
    return {
      amountOfQuestions: ''
    }
  }
}
</script>

<style scoped>

</style>