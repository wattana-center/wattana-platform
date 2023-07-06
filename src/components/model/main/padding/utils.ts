interface HeadCell {
  disablePadding: boolean
  id: keyof JoinBusinessData
  label: string
  numeric: boolean
  sort: boolean
}

interface JoinBusinessData {
  name: string
}

const joinBusinessHeadCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'ชื่อ',
    sort: true
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'ทำเลที่ตั้ง',
    sort: false
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'ความคืบหน้าของการลงทะเบียน',
    sort: false
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'การดำเนินการ',
    sort: false
  }
]

export type { JoinBusinessData }

export { joinBusinessHeadCells }
