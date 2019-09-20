export default {
  path: '/access',
  component: () => import('./../views/access/Entry.vue'),
  children: [
    {
      path: '',
      name: 'access',
      component: () => import('./../views/access/Index.vue')
    },
    {
      path: ':id/edit',
      name: 'edit-access',
      component: () => import('./../views/access/Edit.vue')
    }
  ]
}
