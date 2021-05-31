import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from 'partymeister-accounting/api/booking'

export default function bookingGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'partymeister-accounting.bookings'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
