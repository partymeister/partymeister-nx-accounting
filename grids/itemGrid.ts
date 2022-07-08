import axios from 'axios'
import useBaseGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/item'

export default function useItemGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = useBaseGrid(
        repository,
        'partymeister-accounting.items'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
