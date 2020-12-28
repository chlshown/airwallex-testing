import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Form, Dialog, Input, FormItem, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Input)

Vue.prototype.$alert = MessageBox.alert

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
