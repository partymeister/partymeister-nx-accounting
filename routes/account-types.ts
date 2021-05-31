import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Account types
   */
  {
    path: '/admin/partymeister-accounting/account-types',
    name: 'admin.partymeister-accounting.account-types',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title:
        'partymeister-accounting.account_types.account_types',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/account-types/index.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/account-types/create',
    name: 'admin.partymeister-accounting.account-types.create',
    meta: {
      title:
        'partymeister-accounting.account_types.account_types',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.account-types',
          name: 'partymeister-accounting.account_types.account_types',
        },
        {
          name: 'partymeister-accounting.account_types.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/account-types/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/account-types/edit/:id',
    name: 'admin.partymeister-accounting.account-types.edit',
    meta: {
      title:
        'partymeister-accounting.account_types.account_types',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.account-types',
          name: 'partymeister-accounting.account_types.account_types',
        },
        {
          name: 'partymeister-accounting.account_types.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/account-types/edit.vue'
      ),
  },
]

export default routes
