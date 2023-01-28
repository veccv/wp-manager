<template>
  <v-btn variant="text" @click="this.$emit('remove', deck)">Usuń</v-btn>
</template>

<script>
export default {
  name: "RemoveDeck",
  props: {
    deck: Object,
  },
};
</script>

<style scoped></style>
