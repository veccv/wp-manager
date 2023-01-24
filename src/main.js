import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "material-design-icons-iconfont/dist/material-design-icons.css";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(router).use(CKEditor).mount("#app");
