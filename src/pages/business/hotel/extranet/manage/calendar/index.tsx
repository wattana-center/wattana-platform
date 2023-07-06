import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'

import BusinessCalendarApi from '@app/apis/business-calendar-api'
import { CalendarResponseGetAll } from '@app/apis/interface/business-calendar-interface'
import { Closed } from '@app/components/closed'
import { NextPage } from 'next'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import { Toolbar } from '@mui/material'
import TopbarMange from '@app/layout/Manage/TopbarMange'
import { useEffect } from 'react'

type EMCalendarPageProps = {
  calendar: CalendarResponseGetAll
}

const EMCalendarPage: NextPage<EMCalendarPageProps> = ({ calendar }) => {
  useEffect(() => {
    console.log(calendar)
  }, [calendar])

  return (
    <>
      <Toolbar />
      <TopbarMange />
      <div style={{ marginTop: 10 }} />
      <Closed />
      {/* <ManageCalendar {...calendar} /> */}
      {/* <ManageFacilities master={master} business={business} /> */}
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser, query }) => {
  // Optionally, get other props.
  const token = await AuthUser.getIdToken()

  if (token == null) {
    return {
      redirect: {
        destination: ROUTESPATH.AUTHEN.SING_IN,
        permanent: false
      }
    }
  }

  if (!query.business_id) {
    return { notFound: true }
  }

  let startDate = new Date().toISOString().slice(0, 10)
  let endDate = new Date().toISOString().slice(0, 10)

  if (query.start_date) {
    startDate = new Date(query.start_date as string).toISOString().slice(0, 10)
  }

  if (query.end_date) {
    endDate = new Date(query.end_date as string).toISOString().slice(0, 10)
  }

  // Get all calendar by business_id
  const calendarApi = new BusinessCalendarApi(
    { token: token },
    query.business_id as string
  )

  try {
    const calendar = await calendarApi.getAll<CalendarResponseGetAll>({
      start_date: startDate,
      end_date: endDate
    })
    // const business = await businessApi.get<BusinessResponseGet>(
    //   query.business_id as string
    // )

    const response = await Promise.all([calendar])

    if (response[0].status === 200) {
      return {
        props: {
          calendar: response[0].data
        }
      }
    }
  } catch (_) {
    return {
      notFound: true
    }
  }

  return {
    notFound: true
  }
})

export default withAuthUser<EMCalendarPageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMCalendarPage)
