export default {
  path: '/payee',
  component: () => import('./../views/payee/Entry.vue'),
  children: [
    {
      path: '',
      name: 'payees',
      component: () => import('./../views/payee/Index.vue')
    },
    {
      path: 'create',
      name: 'create-payee',
      component: () => import('./../views/payee/Create.vue')
    },
    {
      path: ':id/create',
      name: 'edit-payee',
      component: () => import('./../views/payee/Edit.vue')
    }
  ]
}
