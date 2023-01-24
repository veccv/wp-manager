<template>
  <v-btn variant="text" @click="this.$emit('remove', question)">Usuń</v-btn>
</template>

<script>
export default {
  name: "RemoveQuestion",
  props: {
    question: Object,
  },
};
</script>

<style scoped></style>
