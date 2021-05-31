import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Bookings
   */
  {
    path: '/admin/partymeister-accounting/bookings',
    name: 'admin.partymeister-accounting.bookings',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title:
        'partymeister-accounting.bookings.bookings',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/bookings/index.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/bookings/create',
    name: 'admin.partymeister-accounting.bookings.create',
    meta: {
      title:
        'partymeister-accounting.bookings.bookings',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.bookings',
          name: 'partymeister-accounting.bookings.bookings',
        },
        {
          name: 'partymeister-accounting.bookings.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/bookings/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-accounting/bookings/edit/:id',
    name: 'admin.partymeister-accounting.bookings.edit',
    meta: {
      title:
        'partymeister-accounting.bookings.bookings',
      breadcrumbs: [
        {
          route: 'admin.partymeister-accounting.bookings',
          name: 'partymeister-accounting.bookings.bookings',
        },
        {
          name: 'partymeister-accounting.bookings.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-accounting/views/admin/bookings/edit.vue'
      ),
  },
]

export default routes
