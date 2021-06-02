import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from 'partymeister-accounting/api/booking'
import Repository from 'motor-core/types/repository'
import accountRepository from 'partymeister-accounting/api/account'

export default function bookingForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    description: yup.string().required(),
    vat_percentage: yup.number().required(),
    price_with_vat: yup.number().required(),
  })

  // Record
  const model = ref({
    id: 0,
    from_account_id: null,
    to_account_id: null,
    description: '',
    vat_percentage: 19.0,
    price_with_vat: 0,
    price_without_vat: 0,
    currency_iso_4217: 'EUR',
    is_manual_booking: true,
  })

  // Sanitize dates
  const sanitizer = () => {}

  // Get schedules from api
  const fromAccounts = ref([])
  const toAccounts = ref([])
  const accountRepo: Repository = accountRepository(axios)
  accountRepo.index({}).then((response) => {
    const toAccountOptions = []
    const fromAccountOptions = []
    toAccountOptions.push({
      name: t('partymeister-accounting.bookings.book_out'),
      value: null,
    })
    fromAccountOptions.push({
      name: t('partymeister-accounting.bookings.book_in'),
      value: null,
    })

    for (let i = 0; i < response.data.data.length; i++) {
      toAccountOptions.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
      fromAccountOptions.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    toAccounts.value = toAccountOptions
    fromAccounts.value = fromAccountOptions
  })

  const { getData, onSubmit } = baseForm(
    'partymeister-accounting.bookings',
    'admin.partymeister-accounting.bookings',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    toAccounts,
    fromAccounts,
  }
}
