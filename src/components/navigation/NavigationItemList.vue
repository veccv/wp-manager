<template>
  <v-list density="compact" nav>
    <NavigationItem title="Strona główna" :icon="mdiAccount()" path="/" />
    <NavigationItem title="Informacje" :icon="mdiAccount()" path="/about" />
  </v-list>
</template>
<script>
import NavigationItem from "@/components/navigation/NavigationItem.vue";
import { mdiAccount } from "@mdi/js";
export default {
  name: "NavigationItemList",
  methods: {
    mdiAccount() {
      return mdiAccount;
    },
  },
  components: { NavigationItem },
};
</script>
