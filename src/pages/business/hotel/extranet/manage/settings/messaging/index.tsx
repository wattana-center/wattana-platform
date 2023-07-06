import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { Container, Toolbar } from '@mui/material'

import BusinessApi from '@app/apis/business-api'
import { BusinessResponseGet } from '@app/apis/interface/business-interface'
import { NextPage } from 'next'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import TopbarMange from '@app/layout/Manage/TopbarMange'

type EMSMessagingPageProps = {
  business: BusinessResponseGet
}

const EMSMessagingPage: NextPage<EMSMessagingPageProps> = () => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        {/* <ManageFacilities master={master} business={business} /> */}
      </Container>
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

  const businessApi = new BusinessApi({ token: token })

  try {
    const business = await businessApi.get<BusinessResponseGet>(
      query.business_id as string
    )

    const response = await Promise.all([business])

    if (response[0].status === 200) {
      return {
        props: {
          business: response[0].data
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

export default withAuthUser<EMSMessagingPageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMSMessagingPage)
