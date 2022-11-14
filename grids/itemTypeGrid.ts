import axios from 'axios'
import callbackGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/itemType'

export default function itemTypeGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = callbackGrid(
        repository,
        'partymeister-accounting.item_types'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
