import axios from 'axios'
import useBaseGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/account'

export default function useAccountGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = useBaseGrid(
        repository,
        'partymeister-accounting.accounts'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
