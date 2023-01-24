<template>
  <v-list-item
    @click="onClick"
    :prepend-icon="icon"
    :title="title"
    :value="path"
  ></v-list-item>
</template>
<script>
export default {
  name: "NavigationRouter",
  props: {
    icon: String,
    path: String,
    title: String,
  },

};
</script>
