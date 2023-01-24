<template>
  <ChooseTable
    :columns="['Nazwa decku', 'ilość pytań']"
    :elements="getDecksToTable()"
  />
</template>

<script>
import ChooseTable from "@/components/ChooseTable.vue";

export default {
  name: "HomeView",
  components: { ChooseTable },
  data() {
    return {
      exams: [],
    };
  },
  methods: {
    async fetchExams() {
      const res = await fetch("api/exams/all");
      const data = await res.json();
      return data;
    },
    getDecksToTable() {
      const preparedDecks = [];
      this.exams.forEach((exam) => {
        preparedDecks.push({
          id: exam.id,
          name: exam.title === null ? "Brak nazwy" : exam.title,
          amount: exam.questions.length,
        });
      });
      return preparedDecks;
    },
    removeQuestion(question) {
      console.log(question);
    },
  },
  async created() {
    this.exams = await this.fetchExams();
  },
};
</script>
