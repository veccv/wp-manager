<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Pytanie</th>
        <th class="text-left">Odpowiedź</th>
        <th class="text-left">Opcje</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="question in questions" :key="question.id">
        <td style="padding: 10px">
          <router-link
            style="text-decoration: none; color: inherit"
            :to="`/deck/${this.$route.params.id}/question/` + question.id"
          >
            <p v-html="question.text" />
          </router-link>
        </td>
        <td>{{ question.answer }}</td>
        <td style="width: 20%">
          <RemoveQuestion
            @remove="$emit('remove', question)"
            :question="question"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import RemoveQuestion from "@/components/RemoveQuestion.vue";

export default {
  name: "DeckTable",
  components: { RemoveQuestion },
  props: {
    questions: Array,
  },
  emits: ["remove"],
};
</script>

<style scoped></style>
