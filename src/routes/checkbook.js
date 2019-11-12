export default {
  path: '/check-book',
  component: () => import('./../views/checkbook/Entry.vue'),
  children: [
    {
      path: '',
      name: 'checkbooks',
      component: () => import('./../views/checkbook/Index.vue')
    },
    {
      path: 'create',
      name: 'create-checkbook',
      component: () => import('./../views/checkbook/Create.vue')
    },
    {
      path: ':id',
      name: 'show-checkbook',
      component: () => import('./../views/checkbook/Show.vue')
    }
  ]
}
