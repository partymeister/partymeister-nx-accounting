<template>
  <AdminCommonGrid
    :name="$t('partymeister-accounting.sales.sales')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="sales"
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
import saleGrid from '../../../grids/saleGrid'

export default defineComponent({
  name: 'admin-partymeister-accounting.sales',
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
        renderer: { type: 'date', format: 'Y-MM-DD HH:mm' },
      },
      {
        name: t('partymeister-accounting.items.item'),
        prop: 'item_and_quantity',
      },
      {
        name: t('partymeister-accounting.bookings.to_account'),
        prop: 'earnings_booking.to_account.name',
      },
      {
        name: t('partymeister-accounting.bookings.price_with_vat'),
        prop: 'price_with_vat',
        renderer: { type: 'currency', format: 'EUR' },
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = <any>[]

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = saleGrid()
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
