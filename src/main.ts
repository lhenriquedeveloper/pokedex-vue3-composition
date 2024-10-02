import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import App from "./App.vue";
import "./style.css";
import { createI18n } from "vue-i18n";
import { messages } from "./locales/index.js";

const i18n = createI18n({
  legacy: false,
  locale: "pt",
  fallbackLocale: "pt",
  messages,
});

const app = createApp(App);
const pinia = createPinia();

app.use(i18n);
app.use(ToastPlugin);
app.use(pinia);
app.mount("#app");
