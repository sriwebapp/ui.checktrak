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
      path: ':id/access',
      name: 'group-access',
      component: () => import('./../views/group/Access.vue')
    }
  ]
}
