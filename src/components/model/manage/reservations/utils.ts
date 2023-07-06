interface HeadCell {
  disablePadding: boolean
  id: keyof BookingData
  label: string
  numeric: boolean
  sort: boolean
}

interface BookingData {
  id: string
  create_at: string
  fullname_th: string
  fullname_en: string
  check_out: string
  check_in: string
  status: string
}

const bookingHeadCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
    sort: true
  },
  {
    id: 'create_at',
    numeric: false,
    disablePadding: true,
    label: 'วันที่จอง',
    sort: true
  },
  {
    id: 'fullname_th',
    numeric: false,
    disablePadding: false,
    label: 'ผู้จอง',
    sort: false
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'สถานะ',
    sort: false
  },
  {
    id: 'check_in',
    numeric: false,
    disablePadding: false,
    label: 'เช็คอิน',
    sort: false
  },
  {
    id: 'check_out',
    numeric: false,
    disablePadding: false,
    label: 'เช็คอิน',
    sort: false
  }
]

export type { BookingData }

export { bookingHeadCells }
