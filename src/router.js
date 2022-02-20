import Vue from 'vue'
import Router from 'vue-router'
/** Home */
import Home from './views/Home.vue'
import ProductManagement from './views/ProductManagement.vue'

/** Common Imports End Here */
Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false, title: 'Home' },
      component: Home
    },
    {
      path: '/product-management',
      name: 'product-management',
      meta: { requiresAuth: false, title: 'Product Management' },
      component: ProductManagement
    },
    {
      path: "/*",
      name: 'pagenotfound',
      meta: { requiresAuth: false, title: 'Page Not Found (404)' },
      component: () => import('./views/PageNotFound.vue')
    },
  ]
})



export default router
