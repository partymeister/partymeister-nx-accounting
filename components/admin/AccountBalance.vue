<template>
  <div class="col-lg-12 col-md-12 mb-md-0 mb-4 mt-4">
    <div class="row ms-2 me-3">
      <div class="col-6">
        <strong>{{ $t('partymeister-accounting.accounts.balance') }}</strong>
      </div>
      <div class="col-6 text-end">
        <strong>{{ balance }}</strong>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AdminSidebar from './Sidebar.vue'
import AdminHeader from './Header.vue'

export default defineComponent({
  props: {
    balance: {
      type: String,
      default: '',
    },
  },
  name: 'AccountBalance',
  setup() {},
})
</script>
