export default {
  path: '/user',
  component: () => import('./../views/user/Entry.vue'),
  children: [
    {
      path: '',
      name: 'users',
      component: () => import('./../views/user/Index.vue')
    },
    {
      path: 'create',
      name: 'create-user',
      component: () => import('./../views/user/Create.vue')
    },
    {
      path: ':id/edit',
      name: 'edit-user',
      component: () => import('./../views/user/Edit.vue')
    },
    {
      path: ':id/access',
      name: 'user-access',
      component: () => import('./../views/user/Access.vue')
    }
  ]
}
