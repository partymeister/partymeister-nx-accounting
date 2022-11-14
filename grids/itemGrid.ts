import axios from 'axios'
import callbackGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/item'

export default function itemGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = callbackGrid(
        repository,
        'partymeister-accounting.items'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
