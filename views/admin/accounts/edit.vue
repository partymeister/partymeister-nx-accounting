<template>
  <AdminCommonForm
    back-route="admin.partymeister-accounting.accounts"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsSelectField
            type="text"
            name="account_type_id"
            id="account_type_id"
            :label="$t('partymeister-accounting.account_types.account_type')"
            :value="model.account_type_id"
            :options="accountTypes"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsInputField
            type="text"
            name="currency_iso_4217"
            id="currency_iso_4217"
            :label="$t('partymeister-accounting.accounts.currency_iso_4217')"
            :value="model.currency_iso_4217"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-backend.global.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsCheckboxField
            type="text"
            name="has_pos"
            id="has_pos"
            :label="$t('partymeister-accounting.accounts.has_pos')"
            :value="model.has_pos"
        ></FormsCheckboxField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import FormsSelectField from 'motor-core/components/forms/SelectField.vue'
import FormsCheckboxField from 'motor-core/components/forms/CheckboxField.vue'

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import useAccountForm from "packages/partymeister-nx-accounting/forms/accountForm";

export default defineComponent({
  name: 'admin-partymeister-accounting-accounts-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsCheckboxField,
    FormsSelectField
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const form = useAccountForm();

    // Set default action title
    const title = ref(
      t('partymeister-accounting.accounts.new')
    )

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-accounting.accounts.edit')
      form.getData(id)
    }

    return {
      title,
      ...form
    }
  },
})
</script>
