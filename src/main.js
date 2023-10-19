import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import './assets/css/app.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import VueRouter from 'vue-router';
import VueRouter from 'vue-router';
import AboutComponent from './components/AboutComponent.vue';
import EmployeeComponent from './components/EmployeeComponent.vue';
// Vue.use(VueRouter)
const routes =[
  {path:'/', component:EmployeeComponent},
  {path:'/about', component:AboutComponent}
];
const router = new VueRouter({
  routes
})
Vue.config.productionTip = false

new Vue({
  routes:router,
  render: h => h(App),
}).$mount('#app')
