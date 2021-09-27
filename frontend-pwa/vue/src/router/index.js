import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Error404 from '../views/Error404.vue'
import Promotion from '../views/Promotion.vue'
import SharePromotion from '../views/SharePromotion.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import AdminApproval from '../views/AdminApproval.vue'
import Admin from '../views/Admin.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404
  },
  {
    path: '/forgot',
    name: 'Forgot Password',
    component: ForgotPassword
  },
  {
    path: '/share-promotion',
    name: 'Share Promotion',
    component: SharePromotion,
    meta: { requiresAuth: true } 
  },
  {
    path: '/admin/:id',
    name: 'Admin Approval',
    component: AdminApproval,
    meta: { requiresAuth: true, adminAuth: true } 
  },
  {
    path: '/promotion/:id',
    name: 'Promotion',
    component: Promotion
  },
  {
    path: '/admin',
    name: 'Admin Page',
    component: Admin,
    meta: { requiresAuth: true, adminAuth: true },
  }
 
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(){
    return window.scrollTo({top: 0, behavior: "smooth"})
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!window.localStorage.getItem('token')) {
      next('/login')
    }else{
      next()
    }
  }else{
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.adminAuth)) {
    const userRole = store.state.role;
    if (userRole !== 'ADMIN') {
      next('/')
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router