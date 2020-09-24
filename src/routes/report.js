export default {
  path: '/report',
  component: () => import('./../views/report/Entry.vue'),
  children: [
    {
      path: '',
      name: 'reports',
      component: () => import('./../views/report/Index.vue')
    },
    {
      path: 'master-list',
      name: 'report-masterlist',
      component: () => import('./../views/report/Masterlist.vue')
    }
  ]
}
