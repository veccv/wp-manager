<template>
  <v-card-actions class="justify-center">
    <v-btn @click="isActive = true"> Dodaj pytanie </v-btn>
    <v-dialog v-model="isActive" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="orange" title="Dodaj nowe pytanie"></v-toolbar>
        <v-card-text>
          <NewQuestionForm @answer="getAnswer" @question="getQuestion" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="addQuestion">Dodaj pytanie</v-btn>
          <v-btn variant="text" @click="isActive = false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <GenerateExam :questions="questions" />
  </v-card-actions>
  <DeckTable :questions="questions" @remove="removeQuestion" />
</template>

<script>
import DeckTable from "@/components/DeckTable.vue";
import NewQuestionForm from "@/components/NewQuestionForm.vue";
import { jsPDF } from "jspdf";
import font from "../assets/FreeSerif-normal";
import GenerateExam from "@/components/GenerateExam.vue";

export default {
  name: "DeckView",
  components: { GenerateExam, NewQuestionForm, DeckTable },
  data() {
    return {
      deckId: this.$route.params.id,
      questions: [],
      isActive: false,
      question: "",
      answer: "",
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
    generateTest() {
      const doc = new jsPDF();

      doc.addFileToVFS("Amiri-Regular.ttf", font);
      doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
      doc.setFont("Amiri");
      doc.setFontSize(10);

      let questionsToRandom = [...this.questions];
      let randomizedQuestions = [];
      while (questionsToRandom.length !== 0) {
        if (randomizedQuestions.length === 5) {
          break;
        }
        let randomIndex = Math.floor(Math.random() * questionsToRandom.length);
        let randomItem = questionsToRandom[randomIndex];
        randomizedQuestions.push(randomItem);
        questionsToRandom.splice(randomIndex, 1);
      }

      let line = 10;
      const { htmlToText } = require("html-to-text");
      randomizedQuestions.forEach((question) => {
        let text = htmlToText(question.text, {
          wordwrap: 130,
        });
        const textArray = text.split("\n");
        textArray.forEach((newLine) => {
          doc.text(newLine, 10, line);
          line += 3;
        });
        if (line < 260) {
          line += 6;
        } else {
          doc.addPage();
          line = 10;
        }
      });
      doc.save(`${Date.now()}.pdf`);
    },
  },
  async created() {
    this.questions = await this.fetchQuestions();
  },
};
</script>

<style scoped></style>
