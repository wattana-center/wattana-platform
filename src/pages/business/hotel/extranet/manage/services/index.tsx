import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { Container, Toolbar } from '@mui/material'

import BusinessServiceApi from '@app/apis/business-service-api'
import ManageServices from '@app/components/model/manage/services'
import { NextPage } from 'next'
import { ServicesResponseGetAll } from '@app/apis/interface/business-services-interface'
import TopbarMange from '@app/layout/Manage/TopbarMange'

type EMServersPageProps = {
  data: ServicesResponseGetAll
}

const EMServersPage: NextPage<EMServersPageProps> = ({ data }) => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <ManageServices data={data.data} />
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser, query }) => {
  if (query.business_id == null) {
    return {
      notFound: true
    }
  }

  const token = await AuthUser.getIdToken()

  if (token) {
    const serviceApi = new BusinessServiceApi(
      { token: token },
      query.business_id as string
    )

    try {
      const response = await serviceApi.getAll<ServicesResponseGetAll>({})
      return {
        props: { data: response.data }
      }
    } catch (_) {
      return {
        notFound: true
      }
    }
  }

  return {
    notFound: true
  }
})

export default withAuthUser<EMServersPageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMServersPage)
