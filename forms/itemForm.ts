import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from 'partymeister-accounting/api/item'
import Repository from 'motor-core/types/repository'
import accountRepository from '../api/account'
import itemTypeRepository from '../api/itemType'
import itemRepository from '../api/item'
import useVatCalculator from '../composables/useVatCalculator'

export default function useItemForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
    item_type_id: null,
    description: '',
    internal_description: '',
    sort_position: 0,
    is_visible: false,
    vat_percentage: 19,
    price_with_vat: 0,
    price_without_vat: 0,
    cost_price_with_vat: 0,
    cost_price_without_vat: 0,
    currency_iso_4217: 'EUR',
    pos_can_book_negative_quantities: false,
    pos_cost_account_id: null,
    pos_create_booking_for_item_id: null,
  })

  // Sanitize dates
  const sanitizer = () => {}

  // Get accounts from api
  const accounts = ref([])
  const accountRepo: Repository = accountRepository(axios)
  accountRepo.index({}).then((response) => {
    const options = []
    options.push({
      name: '-',
      value: null,
    })
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    accounts.value = options
  })

  // Get item types from api
  const itemTypes = ref([])
  const itemTypeRepo: Repository = itemTypeRepository(axios)
  itemTypeRepo.index({}).then((response) => {
    const options = []
    options.push({
      name: '-',
      value: null,
    })
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    itemTypes.value = options
  })

  // Get items from api
  const items = ref([])
  const itemRepo: Repository = itemRepository(axios)
  itemRepo.index({}).then((response) => {
    const options = []
    options.push({
      name: '-',
      value: null,
    })
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    items.value = options
  })

  const { getData, onSubmit, setFieldValue } = baseForm(
    'partymeister-accounting.items',
    'admin.partymeister-accounting.items',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  const { changeVatPercentage, changePriceWithVat, changePriceWithoutVat } =
    useVatCalculator(model, setFieldValue)

  watch(model, (value) => {
    console.log(value)
  })
  return {
    getData,
    onSubmit,
    model,
    accounts,
    itemTypes,
    items,
    changeVatPercentage,
    changePriceWithVat,
    changePriceWithoutVat,
  }
}
