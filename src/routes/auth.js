export default {
  path: '/login',
  component: () => import('./../views/auth/Entry.vue'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import('./../views/auth/Login.vue')
    },
    {
      path: '/reset-password',
      name: 'forgotPassword',
      component: () => import('./../views/auth/ForgotPassword.vue')
    },
    {
      path: '/password/reset/:token',
      name: 'resetPassword',
      component: () => import('./../views/auth/ResetPassword.vue')
    }
  ],
  meta: { requiresVisitor: true }
}
