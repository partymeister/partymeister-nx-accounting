import axios from 'axios'
import useBaseGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/sale'

export default function useSaleGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = useBaseGrid(
        repository,
        'partymeister-accounting.sales'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
