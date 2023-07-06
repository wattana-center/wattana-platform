import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { Container, Toolbar } from '@mui/material'

import BusinessApi from '@app/apis/business-api'
import { BusinessResponseGet } from '@app/apis/interface/business-interface'
import ManageInfo from '@app/components/model/manage/info'
import { NextPage } from 'next'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import TopbarMange from '@app/layout/Manage/TopbarMange'

type EMInfoPageProps = {
  data: BusinessResponseGet
}

const EMInfoPage: NextPage<EMInfoPageProps> = ({ data }) => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <ManageInfo data={data} />
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
    const response = await businessApi.get<BusinessResponseGet>(
      query.business_id as string
    )

    if (response.status === 200) {
      return {
        props: {
          data: response.data
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

export default withAuthUser<EMInfoPageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMInfoPage)
