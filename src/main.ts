import { createApp } from 'vue'
import './style.css'
import './assets/tailwind.css'
import "vue-toastification/dist/index.css"
import App from './App.vue'
import Toast, { PluginOptions } from "vue-toastification";

const app = createApp(App)
app.use(Toast)
app.mount('#app')
