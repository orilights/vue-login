import '@/style.css'
import '@/assets/tailwind.css'
import "vue-toastification/dist/index.css"
import { createApp } from 'vue'
import Toast from "vue-toastification";
import router from '@/router'
import { createPinia } from 'pinia'
import App from '@/App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast)
app.mount('#app')
