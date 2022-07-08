<template>
  <AdminCommonForm
    back-route="admin.partymeister-accounting.item-types"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-12">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('partymeister-accounting.item_types.name')"
          :value="model.name"
        ></FormsInputField>
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
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import FormsCheckboxField from 'motor-core/components/forms/CheckboxField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from 'partymeister-accounting/forms/itemTypeForm'

export default defineComponent({
  name: 'admin-partymeister-accounting-item-types-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsCheckboxField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit } = form()

    // Set default action title
    const title = ref(t('partymeister-accounting.item_types.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-accounting.item_types.edit')
      getData(id)
    }

    return {
      model,
      title,
      onSubmit,
    }
  },
})
</script>
