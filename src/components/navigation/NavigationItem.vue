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
  name: "NavigationItem",
  props: {
    icon: String,
    title: String,
    path: String,
  },
  methods: {
    onClick() {
      this.$router.push(this.path);
    },
  },
};
</script>
