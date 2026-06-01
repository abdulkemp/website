import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import globalComponents from './plugins/globalComponents'
// import PhosphorIcons from "@phosphor-icons/vue"

const app = createApp(App)

app.use(router)
app.use(globalComponents)
// app.use(PhosphorIcons)

app.mount('#app')
