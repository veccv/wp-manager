<template>
  <v-list-item @click="onClick" :icon="icon" :path="path" :title="title">
  </v-list-item>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    id: String,
    icon: String,
    title: String,
    path: String,
    comp: String,
  },
  methods: {
    onClick() {
      this.$router.push(this.path);
    },
  },
};
</script>
