<template>
  <AdminCommonGrid
    :name="
      $t(
        'partymeister-accounting.items.items'
      )
    "
    create-route="admin.partymeister-accounting.items.create"
    :create-label="$t('partymeister-accounting.items.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="items"
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
import grid from 'partymeister-accounting/grids/itemGrid'

export default defineComponent({
  name: 'admin-partymeister-accounting.items',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('partymeister-accounting.item_types.item_type'),
        prop: 'item_type.name',
      },
      {
        name: t('motor-backend.global.name'),
        prop: 'name',
      },
      {
        name: t('partymeister-accounting.items.pos_earnings_account'),
        prop: 'pos_earnings_account.name',
      },
      {
        name: t('partymeister-accounting.bookings.price_with_vat'),
        prop: 'price_with_vat',
        renderer: { type: 'currency', format: 'EUR'}
      },
      {
        name: t('partymeister-accounting.sales.sales'),
        prop: 'sales',
      },
      {
        name: t('partymeister-accounting.items.revenue'),
        prop: 'revenue',
      },
      {
        name: t('motor-backend.global.sort_position'),
        prop: 'sort_position',
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
                'admin.partymeister-accounting.items.edit',
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
