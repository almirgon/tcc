import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loading from '@/components/Loading'
import VeeValidate, { Validator } from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR';
import DataFilter from './filters/dateAgo'
import Currency from './filters/toCurrency'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.use(VueSweetalert2);
Vue.use(VueToastr)

Vue.config.productionTip = false
Vue.use(VeeValidate);
Validator.localize('pt-br', pt_BR)
Vue.component('Loading', Loading)
Vue.filter('dateAgo', DataFilter)
Vue.filter('toCurrency', Currency)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
