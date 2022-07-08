import axios from 'axios'
import useBaseGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/accountType'

export default function useAccountTypeGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = useBaseGrid(
        repository,
        'partymeister-accounting.account_types'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
