<template>
  <AdminCommonGrid
    :name="$t('partymeister-accounting.bookings.bookings')"
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
import bookingGrid from '../../../grids/bookingGrid'
import accountRepository from 'partymeister-accounting/api/account'
import axios from 'axios'

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
        renderer: { type: 'date', format: 'Y-MM-DD HH:mm' },
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
        renderer: { type: 'currency', format: 'EUR' },
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
              route: 'admin.partymeister-accounting.bookings.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Get accounts from api
    const accounts = ref([])
    const accountRepo = accountRepository(axios)
    accountRepo.index({}).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        accounts.value.push({
          name: response.data.data[i].name,
          value: response.data.data[i].id.toString(),
        })
      }
    })

    // Define filters for grid
    const filters = ref([
      { name: 'SearchFilter', options: {} },
      {
        name: 'SelectFilter',
        options: {
          parameter: 'from_account_id',
          emptyOption:
            t('global.filter') +
            ': ' +
            t('partymeister-accounting.bookings.from_account'),
          options: accounts,
        },
      },
      {
        name: 'SelectFilter',
        options: {
          parameter: 'to_account_id',
          emptyOption:
            t('global.filter') +
            ': ' +
            t('partymeister-accounting.bookings.to_account'),
          options: accounts,
        },
      },
      {
        name: 'SelectFilter',
        options: {
          parameter: 'is_manual_booking',
          emptyOption:
            t('global.filter') +
            ': ' +
            t('partymeister-accounting.bookings.is_manual_booking'),
          options: [
            { name: t('global.yes'), value: 1 },
            { name: t('global.no'), value: 0 },
          ],
        },
      },
    ])

    const loadComponents = <any>[]

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = bookingGrid()
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
