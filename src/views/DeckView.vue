<template>
  <v-card-actions class="justify-center">
    <v-btn @click="isActive = true"> Dodaj pytanie</v-btn>
    <v-dialog v-model="isActive" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="orange" title="Dodaj nowe pytanie"></v-toolbar>
        <v-card-text>
          <NewQuestionForm @answer="getAnswer" @question="getQuestion"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="addQuestion">Dodaj pytanie</v-btn>
          <v-btn variant="text" @click="isActive = false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <GenerateExam @generate-dialog="testGeneratorDialog"/>
    <GenerateExamDialog :active-dialog="generateDialogActive" @generate-dialog="testGeneratorDialog"
                        :questions="questions"/>
  </v-card-actions>
  <DeckTable :questions="questions" @remove="removeQuestion"/>
</template>

<script>
import DeckTable from "@/components/deck/DeckTable.vue";
import NewQuestionForm from "@/components/deck/NewQuestionForm.vue";
import GenerateExam from "@/components/deck/GenerateExam.vue";
import GenerateExamDialog from "@/components/deck/GenerateExamDialog.vue";

export default {
  name: "DeckView",
  components: {GenerateExamDialog, GenerateExam, NewQuestionForm, DeckTable},
  data() {
    return {
      deckId: this.$route.params.id,
      questions: [],
      isActive: false,
      question: "",
      answer: "",
      generateDialogActive: false,
    };
  },
  methods: {
    async fetchQuestions() {
      const res = await fetch(`api/exams?id=${this.deckId}`);
      const data = await res.json();
      return data["questions"];
    },
    getQuestion(newQuestion) {
      this.question = newQuestion;
    },
    getAnswer(newAnswer) {
      this.answer = newAnswer;
    },
    async addQuestion() {
      const res = await fetch(`api/exams/question?id=${this.deckId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          text: this.question,
          answer: this.answer,
        }),
      });
      await res.json();

      this.$router.go(this.$router.currentRoute);
    },
    async removeQuestion(question) {
      this.questions = this.questions.filter((q) => q.id !== question.id);

      const res = await fetch(`api/exams/question?deckId=${this.deckId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.questions),
      });
      await res.json();
    },
    testGeneratorDialog() {
      this.generateDialogActive = !this.generateDialogActive;
    }
  },
  async created() {
    this.questions = await this.fetchQuestions();
  },
};
</script>

<style scoped></style>
