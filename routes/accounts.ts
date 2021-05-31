import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Accounts
   */
  {
    path: '/admin/partymeister-accounting/accounts',
    name: 'admin.partymeister-accounting.accounts',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title:
        'partymeister-accounting.accounts.accounts',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/accounts/index.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/accounts/create',
    name: 'admin.partymeister-accounting.accounts.create',
    meta: {
      title:
        'partymeister-accounting.accounts.accounts',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.accounts',
          name: 'partymeister-accounting.accounts.accounts',
        },
        {
          name: 'partymeister-accounting.accounts.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/accounts/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/accounts/edit/:id',
    name: 'admin.partymeister-accounting.accounts.edit',
    meta: {
      title:
        'partymeister-accounting.accounts.accounts',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.accounts',
          name: 'partymeister-accounting.accounts.accounts',
        },
        {
          name: 'partymeister-accounting.accounts.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/accounts/edit.vue'
      ),
  },
]

export default routes
