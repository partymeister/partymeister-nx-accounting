import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Item types
   */
  {
    path: '/admin/partymeister-accounting/item-types',
    name: 'admin.partymeister-accounting.item-types',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title:
        'partymeister-accounting.item_types.item_types',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/item-types/index.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/item-types/create',
    name: 'admin.partymeister-accounting.item-types.create',
    meta: {
      title:
        'partymeister-accounting.item_types.item_types',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.item-types',
          name: 'partymeister-accounting.item_types.item_types',
        },
        {
          name: 'partymeister-accounting.item_types.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/item-types/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/item-types/edit/:id',
    name: 'admin.partymeister-accounting.item-types.edit',
    meta: {
      title:
        'partymeister-accounting.item_types.item_types',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.item-types',
          name: 'partymeister-accounting.item_types.item_types',
        },
        {
          name: 'partymeister-accounting.item_types.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/item-types/edit.vue'
      ),
  },
]

export default routes
