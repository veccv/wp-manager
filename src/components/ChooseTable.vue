<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.name" class="text-left">
          {{ column }}
        </th>
        <th>Opcje</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="element in elements" :key="element.id">
        <td>
          <router-link
            style="text-decoration: none; color: inherit"
            :to="'/deck/' + element.id"
          >
            {{ element.name }}
          </router-link>
        </td>
        <td>{{ element.amount }}</td>
        <td>
          <RemoveDeck @remove="$emit('remove', element)" :deck="element" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import RemoveDeck from "@/components/RemoveDeck.vue";

export default {
  name: "ChooseTable",
  components: { RemoveDeck },
  props: {
    columns: Array,
    elements: Array,
  },
  emits: ["remove"],
};
</script>

<style scoped></style>
