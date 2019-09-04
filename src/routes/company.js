export default {
  path: '/company',
  component: () => import('./../views/company/Entry.vue'),
  children: [
    {
      path: '',
      name: 'companies',
      component: () => import('./../views/company/Index.vue')
    },
    {
      path: 'create',
      name: 'create-company',
      component: () => import('./../views/company/Create.vue')
    },
    {
      path: ':code',
      name: 'show-company',
      component: () => import('./../views/company/Show.vue')
    },
    {
      path: ':code/edit',
      name: 'edit-company',
      component: () => import('./../views/company/Edit.vue')
    }
  ]
}
