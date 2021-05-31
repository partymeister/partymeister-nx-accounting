<template>
  <AdminCommonGrid
    :name="
      $t(
        'partymeister-accounting.bookings.bookings'
      )
    "
    create-route="admin.partymeister-accounting.bookings.create"
    :create-label="$t('partymeister-accounting.bookings.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="bookings"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script lang="ts">
import AdminCommonGrid from 'motor-core/components/admin/common/Grid.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from 'motor-core/components/admin/cell/EditButton.vue'
import DeleteButton from 'motor-core/components/admin/cell/DeleteButton.vue'
import grid from 'partymeister-accounting/grids/bookingGrid'

export default defineComponent({
  name: 'admin-partymeister-accounting.bookings',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('partymeister-accounting.bookings.time'),
        prop: 'created_at',
        renderer: { type: 'date'}
      },
      {
        name: t('partymeister-accounting.bookings.description'),
        prop: 'description',
      },
      {
        name: t('partymeister-accounting.bookings.from_account'),
        prop: 'from_account.name',
      },
      {
        name: t('partymeister-accounting.bookings.to_account'),
        prop: 'to_account.name',
      },
      {
        name: t('partymeister-accounting.bookings.price_with_vat'),
        prop: 'price_with_vat',
        renderer: { type: 'currency', format: 'EUR'}
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 200px',
        rowWrapperClass: 'justify-content-end',
        components: [
          {
            name: 'EditButton',
            options: {
              route:
                'admin.partymeister-accounting.bookings.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = <any>[]

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = grid()
    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      loadComponents,
      handleCellEvent,
    }
  },
})
</script>