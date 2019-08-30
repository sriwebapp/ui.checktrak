import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Entry.vue'),
      children: [
        { path: '', name: 'home', component: () => import('./views/Home.vue') },
        {
          path: '*',
          name: '404',
          component: () => import('./components/404.vue')
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import('./views/auth/Entry.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('./views/auth/Login.vue')
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: () => import('./views/auth/ForgotPassword.vue')
        },
        {
          path: '/password/reset/:token',
          name: 'resetPassword',
          component: () => import('./views/auth/ResetPassword.vue')
        }
      ],
      meta: { requiresVisitor: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.getters.error.reset()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    !store.getters['auth/loggedIn'] ? next({ name: 'login' }) : next()
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    store.getters['auth/loggedIn'] ? next({ name: 'home' }) : next()
  } else {
    next()
  }
})

export default router
