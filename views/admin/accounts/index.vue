<template>
  <AdminCommonGrid
    :name="$t('partymeister-accounting.accounts.accounts')"
    create-route="admin.partymeister-accounting.accounts.create"
    :create-label="$t('partymeister-accounting.accounts.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="accounts"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
  <AccountBalance :balance="balance" />
</template>

<script lang="ts">
import AdminCommonGrid from 'motor-core/components/admin/common/Grid.vue'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from 'motor-core/components/admin/cell/EditButton.vue'
import DeleteButton from 'motor-core/components/admin/cell/DeleteButton.vue'
import grid from 'partymeister-accounting/grids/accountGrid'
import AccountBalance from '../../../components/admin/AccountBalance.vue'

export default defineComponent({
  name: 'admin-partymeister-accounting.accounts',
  components: {
    AccountBalance,
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
        name: t('partymeister-accounting.account_types.account_type'),
        prop: 'account_type.name',
      },
      {
        name: t('partymeister-accounting.accounts.has_pos'),
        prop: 'has_pos',
        renderer: { type: 'boolean' },
      },
      {
        name: t('partymeister-accounting.accounts.currency_iso_4217'),
        prop: 'currency_iso_4217',
      },
      {
        name: t('partymeister-accounting.accounts.last_booking'),
        prop: 'last_booking',
        renderer: { type: 'date', format: 'Y-MM-DD HH:mm' },
      },
      {
        name: t('partymeister-accounting.accounts.balance'),
        prop: 'balance',
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
              route: 'admin.partymeister-accounting.accounts.edit',
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

    const balance = ref('0.00 EUR')

    // Show total balance below the grid
    watch(rows, (value) => {
      let totalBalance = 0
      let currency = 'EUR'
      value.forEach((row) => {
        totalBalance += row.balance
        currency = row.currency_iso_4217
      })

      balance.value = totalBalance.toFixed(2) + ' ' + currency
    })

    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      loadComponents,
      handleCellEvent,
      balance,
    }
  },
})
</script>
