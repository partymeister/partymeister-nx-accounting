import axios from 'axios'
import callbackGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/sale'

export default function saleGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = callbackGrid(
        repository,
        'partymeister-accounting.sales'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
