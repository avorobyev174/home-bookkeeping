import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import Paginate from "vuejs-paginate"
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from "./filters/currency.filter";
import tooltipDirective from "./directives/tooltip.directeve";
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import 'materialize-css/dist/js/materialize.min'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyBYaEJmQe0HhJxz-ILEqJ8WJmlwOshuBCU",
  authDomain: "vue-crm-d25e8.firebaseapp.com",
  projectId: "vue-crm-d25e8",
  storageBucket: "vue-crm-d25e8.appspot.com",
  messagingSenderId: "258009526404",
  appId: "1:258009526404:web:e2755bb69487909ac2d2d1",
  measurementId: "G-Y22FMDM83X"
};

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


