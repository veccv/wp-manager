<template>
  <v-form>
    <v-text-field
      v-model="deckName"
      label="Nazwa decku"
      required
      @input="this.$emit('deck-name', this.deckName)"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "NewDeckForm",
  data() {
    return {
      deckName: "",
    };
  },
};
</script>

<style scoped></style>
