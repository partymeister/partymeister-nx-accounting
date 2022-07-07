<template>
  <AdminCommonForm
    back-route="admin.partymeister-accounting.sales"
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
          :label="$t('partymeister-accounting.sales.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import useSaleForm from "packages/partymeister-nx-accounting/forms/saleForm";

export default defineComponent({
  name: 'admin-partymeister-accounting-sales-create',
  components: {
    AdminCommonForm,
    FormsInputField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit } = useSaleForm()

    // Set default action title
    const title = ref(
      t('partymeister-accounting.sales.new')
    )

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-accounting.sales.edit')
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
