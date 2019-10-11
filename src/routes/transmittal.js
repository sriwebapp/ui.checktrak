export default {
  path: '/transmittal',
  component: () => import('./../views/transmittal/Entry.vue'),
  children: [
    {
      path: '',
      name: 'transmittals',
      component: () => import('./../views/transmittal/Index.vue')
    },
    {
      path: ':id',
      name: 'show-transmittal',
      component: () => import('./../views/transmittal/Show.vue')
    }
  ]
}
