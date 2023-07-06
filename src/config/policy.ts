const INTERVALPOLICY = [
  {
    label: 'จนถึง 18:00 ของวันเข้าพัก',
    value: '18h'
  },
  {
    label: 'จนถึง 14:00 ของวันเข้าพัก',
    value: '14h'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 1 วัน',
    value: '1d'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 2 วัน',
    value: '2d'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 3 วัน',
    value: '3d'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 5 วัน',
    value: '5d'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 7 วัน',
    value: '7d'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 14 วัน',
    value: '14d'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 30 วัน',
    value: '30d'
  },
  {
    label: 'ก่อนถึงวันเข้าพัก 60 วัน',
    value: '60d'
  }
]

const CANCELATION = [
  {
    label: 'ราคาคืนแรก',
    value: '100fn'
  },
  {
    label: '50% ของราคาทั้งหมด',
    value: '50'
  },
  {
    label: '100% ของราคาทั้งหมด',
    value: '100'
  }
]

export { INTERVALPOLICY, CANCELATION }
