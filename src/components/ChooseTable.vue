<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.name" class="text-left">
          {{ column }}
        </th>
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
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: "ChooseTable",
  props: {
    columns: Array,
    elements: Array,
  },
};
</script>

<style scoped></style>
