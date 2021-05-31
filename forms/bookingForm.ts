import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from 'partymeister-accounting/api/booking'

export default function bookingForm() {
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
    })

    // Sanitize dates
    const sanitizer = () => {
    }


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
    }
}
