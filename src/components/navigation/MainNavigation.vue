<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer permanent location="left">
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            title="Jane Smith"
            subtitle="Logged in"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

        <NavigationItemList :items="items" />
      </v-navigation-drawer>
      <v-main style="height: 250px">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import NavigationItemList from "@/components/navigation/NavigationItemList.vue";

export default {
  name: "MainNavigation",
  components: { NavigationItemList },
  data() {
    return {
      items: [
        {
          id: "1",
          title: "Strona główna",
          icon: "",
          path: "/",
        },
        {
          id: "2",
          title: "Informacje",
          icon: "",
          path: "/about",
        },
      ],
    };
  },
};
</script>
