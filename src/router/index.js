import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
    children: [{
      path: '/login',
      component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
    }]
  }]
})