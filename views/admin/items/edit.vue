<template>
  <AdminCommonForm
    back-route="admin.partymeister-accounting.items"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('partymeister-accounting.items.name')"
          :value="model.name"
          :valueProp="name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          type="text"
          name="item_type_id"
          id="item_type_id"
          :label="$t('partymeister-accounting.item_types.item_type')"
          :value="model.item_type_id"
          :options="itemTypes"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsTextAreaField
          type="text"
          name="description"
          id="description"
          :label="$t('partymeister-accounting.items.description')"
          :value="model.description"
        ></FormsTextAreaField>
      </div>
      <div class="col-md-6">
        <FormsTextAreaField
          type="text"
          name="internal_description"
          id="internal_description"
          :label="$t('partymeister-accounting.items.internal_description')"
          :value="model.internal_description"
        ></FormsTextAreaField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="sort_position"
          id="sort_position"
          :label="$t('motor-backend.global.sort_position')"
          :value="model.sort_position"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsCheckboxField
          type="text"
          name="is_visible"
          id="is_visible"
          :label="$t('motor-backend.global.is_visible')"
          :value="model.is_visible"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="vat_percentage"
          id="vat_percentage"
          :label="$t('partymeister-accounting.bookings.vat_percentage')"
          :value="model.vat_percentage"
          @blur="
            changeVatPercentage($event, [
              'price_without_vat',
              'cost_price_without_vat',
            ])
          "
        ></FormsInputField>
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
          name="cost_price_with_vat"
          id="cost_price_with_vat"
          :label="$t('partymeister-accounting.items.cost_price_with_vat')"
          :value="model.cost_price_with_vat"
          @blur="changePriceWithVat($event, ['cost_price_without_vat'])"
        ></FormsInputField>
      </div>
      <div class="col-md-3">
        <FormsInputField
          type="text"
          name="cost_price_without_vat"
          id="cost_price_without_vat"
          :label="$t('partymeister-accounting.items.cost_price_without_vat')"
          :value="model.cost_price_without_vat"
          @blur="changePriceWithoutVat($event, ['cost_price_with_vat'])"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsCheckboxField
          type="text"
          name="pos_can_book_negative_quantitites"
          id="pos_can_book_negative_quantitites"
          :label="
            $t('partymeister-accounting.items.pos_can_book_negative_quantities')
          "
          :value="model.pos_can_book_negative_quantities"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-4">
        <FormsSelectField
          type="text"
          name="pos_create_booking_for_item_id"
          id="pos_create_booking_for_item_id"
          :label="
            $t('partymeister-accounting.items.pos_create_booking_for_item')
          "
          :value="model.pos_create_booking_for_item_id"
          :options="items"
        ></FormsSelectField>
      </div>
      <div class="col-md-4">
        <FormsSelectField
          type="text"
          name="pos_cost_account_id"
          id="pos_cost_account_id"
          :label="$t('partymeister-accounting.items.pos_cost_account')"
          :value="model.pos_cost_account_id"
          :options="accounts"
        ></FormsSelectField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import FormsSelectField from 'motor-core/components/forms/SelectField.vue'
import FormsCheckboxField from 'motor-core/components/forms/CheckboxField.vue'
import FormsTextAreaField from 'motor-core/components/forms/TextAreaField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import useItemForm from "packages/partymeister-nx-accounting/forms/itemForm";

export default defineComponent({
  name: 'admin-partymeister-accounting-items-create',
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
    const form = useItemForm()

    // Set default action title
    const title = ref(t('partymeister-accounting.items.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-accounting.items.edit')
      form.getData(id)
    }

    watch(form.model, (value) => {
      console.log('watched model in form', value)
    })

    return {
      title,
      ...form
    }
  },
})
</script>
