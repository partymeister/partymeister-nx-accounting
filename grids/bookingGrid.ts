import axios from 'axios'
import useBaseGrid from "motor-core/grids/baseGrid";
import modelRepository from 'partymeister-accounting/api/booking'

export default function useBookingGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = useBaseGrid(
        repository,
        'partymeister-accounting.bookings'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
