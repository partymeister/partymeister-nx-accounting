import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Sales
   */
  {
    path: '/admin/partymeister-accounting/sales',
    name: 'admin.partymeister-accounting.sales',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title:
        'partymeister-accounting.sales.sales',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/sales/index.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/sales/create',
    name: 'admin.partymeister-accounting.sales.create',
    meta: {
      title:
        'partymeister-accounting.sales.sales',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.sales',
          name: 'partymeister-accounting.sales.sales',
        },
        {
          name: 'partymeister-accounting.sales.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/sales/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/sales/edit/:id',
    name: 'admin.partymeister-accounting.sales.edit',
    meta: {
      title:
        'partymeister-accounting.sales.sales',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.sales',
          name: 'partymeister-accounting.sales.sales',
        },
        {
          name: 'partymeister-accounting.sales.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/sales/edit.vue'
      ),
  },
]

export default routes
