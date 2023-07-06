import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'

import BusinessApi from '@app/apis/business-api'
import { BusinessResponseGet } from '@app/apis/interface/business-interface'
import ManageMain from '@app/components/model/manage/main'
import { NextPage } from 'next'
import ROUTESPATH from '@app/config/routes-path'
import { Toolbar } from '@mui/material'
import TopbarMange from '@app/layout/Manage/TopbarMange'

type EMStartPageProps = {
  res: BusinessResponseGet
}

const EMStartPage: NextPage<EMStartPageProps> = ({ res }) => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <ManageMain data={res} />
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
          res: response.data
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

export default withAuthUser<EMStartPageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMStartPage)
