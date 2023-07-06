import ROUTESPATH from './routes-path'

const NAVIGATOR_SLIDE = {
  GROUP: [
    {
      name: 'Group Home',
      icon: 'home',
      action: ROUTESPATH.BUSINESS.HOTEL.GROUP.HOME
    },
    {
      name: 'Reviews',
      icon: 'rate_review',
      action: ROUTESPATH.BUSINESS.HOTEL.GROUP.REVIEWS
    },
    {
      name: 'Reservations',
      icon: 'book_online',
      action: ROUTESPATH.BUSINESS.HOTEL.GROUP.RESERVATIONS
    }
  ],
  EXTRANET: [
    {
      name: 'Home',
      icon: 'home',
      action: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.HOME
    },
    {
      name: 'Dashboard',
      icon: 'dashboard',
      action: ROUTESPATH.HOME
    }
  ]
}

export default NAVIGATOR_SLIDE
