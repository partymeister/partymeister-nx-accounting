<template>
  <AdminCommonForm
    back-route="admin.partymeister-accounting.bookings"
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
          name="from_account_id"
          id="from_account_id"
          :label="$t('partymeister-accounting.bookings.from_account')"
          :value="model.from_account_id"
          :options="fromAccounts"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          type="text"
          name="to_account_id"
          id="to_account_id"
          :label="$t('partymeister-accounting.bookings.to_account')"
          :value="model.to_account_id"
          :options="toAccounts"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsTextAreaField
          type="text"
          name="description"
          id="description"
          :label="$t('partymeister-accounting.bookings.description')"
          :value="model.description"
        ></FormsTextAreaField>
      </div>
      <div class="col-md-6">
        <FormsCheckboxField
          type="text"
          name="is_manual_booking"
          id="is_manual_booking"
          :label="$t('partymeister-accounting.bookings.is_manual_booking')"
          :value="model.is_manual_booking"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-3">
        <FormsInputField
          type="text"
          name="vat_percentage"
          id="vat_percentage"
          :label="$t('partymeister-accounting.bookings.vat_percentage')"
          :value="model.vat_percentage"
          @blur="changeVatPercentage($event, ['price_without_vat'])"
        ></FormsInputField>
      </div>
      <div class="col-md-3">
        <FormsInputField
          type="text"
          name="price_with_vat"
          id="price_with_vat"
          :label="$t('partymeister-accounting.bookings.price_with_vat')"
          :value="model.price_with_vat"
          @blur="changePriceWithVat($event, ['price_without_vat'])"
        ></FormsInputField>
      </div>
      <div class="col-md-3">
        <FormsInputField
          type="text"
          name="price_without_vat"
          id="price_without_vat"
          :label="$t('partymeister-accounting.bookings.price_without_vat')"
          :value="model.price_without_vat"
          @blur="changePriceWithoutVat($event, ['price_with_vat'])"
        ></FormsInputField>
      </div>
      <div class="col-md-3">
        <FormsInputField
          type="text"
          name="currency_iso_4217"
          id="currency_iso_4217"
          :label="$t('partymeister-accounting.accounts.currency_iso_4217')"
          :value="model.currency_iso_4217"
        ></FormsInputField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import FormsSelectField from 'motor-core/components/forms/SelectField.vue'
import FormsTextAreaField from 'motor-core/components/forms/TextAreaField.vue'
import FormsCheckboxField from 'motor-core/components/forms/CheckboxField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from 'partymeister-accounting/forms/bookingForm'
import useVatCalculator from '../../../compositions/helpers/useVatCalculator'

export default defineComponent({
  name: 'admin-partymeister-accounting-bookings-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsSelectField,
    FormsTextAreaField,
    FormsCheckboxField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit, toAccounts, fromAccounts } = form()

    // Set default action title
    const title = ref(t('partymeister-accounting.bookings.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-accounting.bookings.edit')
      getData(id)
    }

    const { changeVatPercentage, changePriceWithVat, changePriceWithoutVat } =
      useVatCalculator(model)

    return {
      model,
      title,
      onSubmit,
      toAccounts,
      fromAccounts,
      changeVatPercentage,
      changePriceWithVat,
      changePriceWithoutVat,
    }
  },
})
</script>
