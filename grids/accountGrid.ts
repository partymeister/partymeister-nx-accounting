import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from 'partymeister-accounting/api/account'

export default function accountGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'partymeister-accounting.accounts'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
