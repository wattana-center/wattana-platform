interface HeadCell {
  disablePadding: boolean
  id: keyof BusinessData
  label: string
  numeric: boolean
  sort: boolean
  maxWidth: number
}

interface BusinessData {
  id: string
  name: string
}

const businessHeadCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
    sort: true,
    maxWidth: 5
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'ชื่อ',
    sort: true,
    maxWidth: 25
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'ทำเลที่ตั้ง',
    sort: false,
    maxWidth: 50
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'สถานะ',
    sort: false,
    maxWidth: 10
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'เช็คอิน/เช็คเอาท์ สำหรับวันนี้และพรุ่งนี้',
    sort: false,
    maxWidth: 10
  }
]
export type { BusinessData }

export { businessHeadCells }
