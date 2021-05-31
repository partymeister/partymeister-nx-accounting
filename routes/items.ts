import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Items
   */
  {
    path: '/admin/partymeister-accounting/items',
    name: 'admin.partymeister-accounting.items',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title:
        'partymeister-accounting.items.items',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/items/index.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/items/create',
    name: 'admin.partymeister-accounting.items.create',
    meta: {
      title:
        'partymeister-accounting.items.items',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.items',
          name: 'partymeister-accounting.items.items',
        },
        {
          name: 'partymeister-accounting.items.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/items/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/items/edit/:id',
    name: 'admin.partymeister-accounting.items.edit',
    meta: {
      title:
        'partymeister-accounting.items.items',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.items',
          name: 'partymeister-accounting.items.items',
        },
        {
          name: 'partymeister-accounting.items.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/items/edit.vue'
      ),
  },
]

export default routes
