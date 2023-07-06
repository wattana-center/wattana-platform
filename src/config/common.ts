const BASE_URL = process.env.REACT_APP_API_ENDPOINT

const BUSINESS_API = BASE_URL + '/business/info'
const BUSINESS_GROUP_API = BASE_URL + '/business/group'
const BUSINESS_SERVICE_API = BASE_URL + '/business/:businessID/services'
const BUSINESS_BOOKING_API = BASE_URL + '/business/:businessID/booking'
const BUSINESS_IMAGES_API = BASE_URL + '/business/:businessID/images'
const BUSINESS_NEARBY_API = BASE_URL + '/business/:businessID/nearby'
const BUSINESS_FACILITY_API = BASE_URL + '/business/:businessID/facility'
const BUSINESS_TAGS_API = BASE_URL + '/business/:businessID/tags'
const BUSINESS_CALENDAR_API = BASE_URL + '/business/:businessID/calendar'

const BUSINESS_RATE_PLANS_API =
  BASE_URL + '/business/:businessID/service/:serviceID/rateplan'
const BUSINESS_AVAILABILITY_API =
  BASE_URL + '/business/:businessID/service/:serviceID/availability'
const BUSINESS_RATE_API =
  BASE_URL +
  '/business/:businessID/service/:serviceID/ratePlan/:ratePlanID/rates'
// business / 33 / service / 9 / ratePlan / 13 / rates
const BUSINESS_USERS_API = BASE_URL + '/business/users'
const BUSINESS_REGISTER = BASE_URL + '/business/register'
const BUSINESS_MASTER_FACILITY = BASE_URL + '/master/facility'

const CONTACT_ERROR = process.env.CONTACT_ERROR

export {
  BUSINESS_API,
  BUSINESS_GROUP_API,
  BUSINESS_SERVICE_API,
  BUSINESS_BOOKING_API,
  BUSINESS_IMAGES_API,
  BUSINESS_NEARBY_API,
  BUSINESS_FACILITY_API,
  BUSINESS_TAGS_API,
  BUSINESS_CALENDAR_API,
  BUSINESS_RATE_PLANS_API,
  BUSINESS_AVAILABILITY_API,
  BUSINESS_RATE_API,
  BUSINESS_USERS_API,
  BUSINESS_REGISTER,
  BUSINESS_MASTER_FACILITY,
  CONTACT_ERROR
}
