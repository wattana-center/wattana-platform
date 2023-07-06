const ROUTESPATH = {
  HOME: '/',
  AUTHEN: {
    SING_IN: '/auth',
    SIGN_OUT: '/signout',
    RESET_PASSWORD: '/resetpassword',
    SIGN_UP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    CONFIRM_EMAIL: '/confirm-email'
  },
  PROFILE: {
    INDEX: '/profile',
    HISTORY: '/history'
  },
  BOOKING: {
    INDEX: '/booking',
    DETAIL: '/booking/1',
    INFO: '/booking/1/info',
    PAYMENT: '/booking/1/payment',
    CONFIRM: '/booking/1/confirm'
  },
  BUSINESS: {
    HOTEL: {
      JOIN: {
        CATEGORY: '/business/join/category/{id}'
      },
      GROUP: {
        HOME: '/business/hotel/group/home',
        REVIEWS: '/business/hotel/group/reviews',
        RESERVATIONS: '/business/hotel/group/reservations'
      },
      EXTRANET: {
        MANAGE: {
          HOME: '/business/hotel/extranet/manage/start', //หน้าหลัก
          RATES_AVAILABILITY: {
            CALENDAR: '/business/hotel/extranet/manage/calendar', //ปรับแต่งราคาห้องพัก
            RATECP_WIZARD: '', //ปรับแต่งราคาห้องพักทั้งปี
            INVENTORY: '', //เปิด ปิดจอง
            RATE_PLANS: '', //เรทแพลน
            SEMI_FLEX_RATE_CONVERSION: '' //ปรับเรทแพลนแบบยืดหยุ่นให้เป็น "ยืดหยุ่นได้ - 1 วัน"
          },
          RESERVATIONS: {
            SEARCH_RESERVATIONS:
              '/business/hotel/extranet/manage/search_reservations' //การจอง
          },
          PROPERTY: {
            CONTENT_SCORE: '/business/hotel/extranet/manage/content_score', //คะแนนของหน้าข้อมูลที่พัก
            FACILITIES: '/business/hotel/extranet/manage/facilities', //สิ่งอำนวยความสะดวกและบริการ
            AMENITIES: '/business/hotel/extranet/manage/amenities', //สิ่งอำนวยความสะดวกในห้องพัก
            PHOTOS: '/business/hotel/extranet/manage/photos', //ภายถ่าย
            POLICIES: '/business/hotel/extranet/manage/policies', //นโยบาย
            GENERAL_INFO: '/business/hotel/extranet/manage/info', //ข้อมูลทั่วไป
            ROOMS: '/business/hotel/extranet/manage/services', //ข้อมูลห้องพัก
            ROOMS_CREATE: '/business/hotel/extranet/manage/services/create', //สร้างห้องพักข้อมูลห้องพัก
            TRANSPORTATION: '/business/hotel/extranet/manage/transportation', //วิธีการเดินทางไป
            PROPERTY_PROFILE:
              '/business/hotel/extranet/manage/property_profile', //โปรไฟล์ของท่าน
            SURROUNDINGS: '/business/hotel/extranet/manage/surroundings', //มีอะไรอยู่ใกล้เคียงบ้าง
            SETTINGS: {
              MESSAGING: '/business/hotel/extranet/manage/settings/messaging', //การตั้งค่าการรับส่งข้อความ
              TRANSACTION:
                '/business/hotel/extranet/manage/settings/transaction'
            }
          }
        }
      }
    }
  }
}

export default ROUTESPATH
