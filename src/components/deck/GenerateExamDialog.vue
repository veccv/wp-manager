<template>
  <v-dialog v-model="show" transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar color="black" title="Opcje generowania"></v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="generateTest">Pobierz</v-btn>
        <v-btn variant="text" @click="$emit('generate-dialog')">Zamknij</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {jsPDF} from "jspdf";
import font from "@/assets/FreeSerif-normal";

export default {
  name: "GenerateExamDialog",
  props: {
    activeDialog: {type: Boolean, required: true},
    questions: Array,
  },
  computed: {
    show: {
      get () {
        return this.activeDialog
      },
      set () {
        this.$emit('generate-dialog')
      }
    }
  },
  methods: {
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
      const {htmlToText} = require("html-to-text");
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
  }
}
</script>

<style scoped>

</style>