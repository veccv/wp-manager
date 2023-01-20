<template>{{ exams.length }}--- aaa</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      exams: [],
    };
  },
  methods: {
    async fetchExams() {
      const res = await fetch("api/exams/all");
      const data = await res.json();
      console.log(data);
      return data;
    },
  },
  async created() {
    this.exams = await this.fetchExams();
  },
};
</script>
