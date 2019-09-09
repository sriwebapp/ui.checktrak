export default {
  path: '/account',
  component: () => import('./../views/account/Entry.vue'),
  children: [
    {
      path: '',
      name: 'accounts',
      component: () => import('./../views/account/Index.vue')
    },
    {
      path: 'create',
      name: 'create-account',
      component: () => import('./../views/account/Create.vue')
    },
    {
      path: ':id',
      name: 'show-account',
      component: () => import('./../views/account/Show.vue')
    },
    {
      path: ':id/edit',
      name: 'edit-account',
      component: () => import('./../views/account/Edit.vue')
    }
  ]
}
