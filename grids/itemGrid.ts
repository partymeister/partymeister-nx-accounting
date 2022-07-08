import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from 'partymeister-accounting/api/item'

export default function itemGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'partymeister-accounting.items'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
