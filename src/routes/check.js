export default {
  path: '/check',
  component: () => import('./../views/check/Entry.vue'),
  children: [
    {
      path: '',
      name: 'checks',
      component: () => import('./../views/check/Index.vue')
    }
  ]
}
