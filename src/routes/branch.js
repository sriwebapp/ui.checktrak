export default {
  path: '/branch',
  component: () => import('./../views/branch/Entry.vue'),
  children: [
    {
      path: '',
      name: 'branches',
      component: () => import('./../views/branch/Index.vue')
    },
    {
      path: 'create',
      name: 'create-branch',
      component: () => import('./../views/branch/Create.vue')
    },
    {
      path: ':id/edit',
      name: 'edit-branch',
      component: () => import('./../views/branch/Edit.vue')
    }
  ]
}
