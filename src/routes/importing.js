export default {
  path: '/import',
  component: () => import('./../views/imports/Entry.vue'),
  children: [
    {
      path: '',
      name: 'imports',
      component: () => import('./../views/imports/Index.vue')
    },
    {
      path: ':id',
      name: 'show-import',
      component: () => import('./../views/imports/Show.vue')
    }
  ]
}
