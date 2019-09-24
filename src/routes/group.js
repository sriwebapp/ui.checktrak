export default {
  path: '/group',
  component: () => import('./../views/group/Entry.vue'),
  children: [
    {
      path: '',
      name: 'groups',
      component: () => import('./../views/group/Index.vue')
    },
    {
      path: 'create',
      name: 'create-group',
      component: () => import('./../views/group/Create.vue')
    },
    {
      path: ':id/edit',
      name: 'edit-group',
      component: () => import('./../views/group/Edit.vue')
    }
  ]
}
