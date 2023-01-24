<template>
  <v-list density="compact" nav>
    <div v-for="item in items" :key="item.id">
      <NavigationItem
        :id="item.id"
        :title="item.title"
        :icon="mdiAccount()"
        :path="item.path"
      />
    </div>
    <v-list-item @click="isActive = true" title="Dodaj deck" />
    <v-dialog v-model="isActive" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="primary" title="Dodaj nowy deck"></v-toolbar>
        <v-card-text>
          <NewDeckForm @deck-name="getDeckName" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="addDeck">Dodaj deck</v-btn>
          <v-btn variant="text" @click="isActive = false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>
<script>
import NavigationItem from "@/components/navigation/NavigationItem.vue";
import { mdiAccount } from "@mdi/js";
import NewDeckForm from "@/components/NewDeckForm.vue";

export default {
  name: "NavigationItemList",
  props: {
    items: Array,
  },
  methods: {
    mdiAccount() {
      return mdiAccount;
    },
    async addDeck() {
      const res = await fetch("api/exams", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: this.deckName,
        }),
      });
      await res.json();

      this.$router.go(this.$router.currentRoute);
    },
    getDeckName(newDeckName) {
      this.deckName = newDeckName;
    },
  },
  components: { NewDeckForm, NavigationItem },
  data() {
    return {
      deckName: "",
      isActive: false,
    };
  },
};
</script>
