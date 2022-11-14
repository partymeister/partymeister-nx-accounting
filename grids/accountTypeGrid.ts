import axios from 'axios'
import callbackGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/accountType'

export default function accountTypeGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = callbackGrid(
        repository,
        'partymeister-accounting.account_types'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
