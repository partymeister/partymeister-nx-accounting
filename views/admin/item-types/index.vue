<template>
  <AdminCommonGrid
    :name="$t('partymeister-accounting.item_types.item_types')"
    create-route="admin.partymeister-accounting.item-types.create"
    :create-label="$t('partymeister-accounting.item_types.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="itemTypes"
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
import useItemTypeGrid from 'packages/partymeister-nx-accounting/grids/itemTypeGrid'

export default defineComponent({
  name: 'admin-partymeister-accounting.item-types',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-backend.global.name'),
        prop: 'name',
      },
      {
        name: t('partymeister-accounting.items.items'),
        prop: 'item_count',
      },
      {
        name: t('motor-backend.global.sort_position'),
        prop: 'sort_position',
      },
      {
        name: t('motor-backend.global.is_visible'),
        prop: 'is_visible',
        renderer: { type: 'boolean' },
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
              route: 'admin.partymeister-accounting.item-types.edit',
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
    const { rows, meta, refreshRecords, handleCellEvent } = useItemTypeGrid()
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
