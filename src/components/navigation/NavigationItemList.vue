<template>
  <v-list density="compact" nav>
    <div v-for="item in items" :key="item.id">
      <NavigationItem
        :title="item.title"
        :icon="mdiAccount()"
        :path="item.path"
      />
    </div>
  </v-list>
</template>
<script>
import NavigationItem from "@/components/navigation/NavigationItem.vue";
import { mdiAccount } from "@mdi/js";

export default {
  name: "NavigationItemList",
  props: {
    items: Array,
  },
  methods: {
    mdiAccount() {
      return mdiAccount;
    },
  },
  components: { NavigationItem },
};
</script>
