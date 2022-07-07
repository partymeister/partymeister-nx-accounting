import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from 'partymeister-accounting/api/account'
import Repository from "../../motor-nx-core/types/repository";
import accountTypeRepository from "../../partymeister-nx-accounting/api/accountType";

export default function useAccountForm() {
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
        has_pos: false,
        account_type_id: 0,
        currency_iso_4217: 'EUR'
    })

    // Sanitize dates
    const sanitizer = () => {
    }


    // Get schedules from api
    const accountTypes = ref([])
    const accountTypeRepo: Repository = accountTypeRepository(axios)
    accountTypeRepo.index({}).then((response) => {
        const options = []
        for (let i = 0; i < response.data.data.length; i++) {
            options.push({
                name: response.data.data[i].name,
                value: response.data.data[i].id,
            })
        }
        accountTypes.value = options
    })

    const { getData, onSubmit } = baseForm(
        'partymeister-accounting.accounts',
        'admin.partymeister-accounting.accounts',
        modelRepository(axios),
        model,
        schema,
        sanitizer
    )

    return {
        getData,
        onSubmit,
        model,
        accountTypes
    }
}
