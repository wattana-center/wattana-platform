import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { Container, Toolbar } from '@mui/material'

import ManageServicesCreate from '@app/components/model/manage/services/create'
import { NextPage } from 'next'
import TopbarMange from '@app/layout/Manage/TopbarMange'

type EMServersCreatePageProps = {
  data?: any
}

const EMServersCreatePage: NextPage<EMServersCreatePageProps> = () => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <ManageServicesCreate />
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ query }) => {
  if (query.business_id == null) {
    return {
      notFound: true
    }
  }

  return {
    props: {}
  }
})

export default withAuthUser<EMServersCreatePageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMServersCreatePage)
