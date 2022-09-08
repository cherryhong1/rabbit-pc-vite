import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/language'
import 'normalize.css'
import '@/assets/styles/common.less'
import ui from "@/components/library"
import '@/mock/index'

const app = createApp(App)
app.use(store).use(router).use(ui).use(i18n).mount('#app')
const unMountedApp = app.unmount
app.unmount = () =>{
  i18n.dispose()
  unMountedApp
}