export default {
  path: '/transmittal',
  component: () => import('./../views/transmittal/Entry.vue'),
  children: [
    {
      path: '',
      name: 'transmittals',
      component: () => import('./../views/transmittal/Index.vue')
    }
  ]
}
