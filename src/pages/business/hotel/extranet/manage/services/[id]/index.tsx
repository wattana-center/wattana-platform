import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { Container, Toolbar } from '@mui/material'

import BusinessServiceApi from '@app/apis/business-service-api'
import { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import RoomDescription from '@app/components/model/manage/services/description'
import { ServicesResponseGet } from '@app/apis/interface/business-services-interface'
import TopbarMange from '@app/layout/Manage/TopbarMange'

type EMServersDescriptionProps = {
  data: ServicesResponseGet
}

const EMServersDescriptionPage: NextPage<EMServersDescriptionProps> = ({
  data
}) => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <RoomDescription
          addRoomClose={() => {
            //
          }}
          roomData={{ ...data }}
        />
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser, query, params }) => {
  if (query.business_id == null) {
    return {
      notFound: true
    }
  }

  const id = (params as ParsedUrlQuery).id

  if (id == null) {
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
      const response = await serviceApi.get<ServicesResponseGet>(id as string)
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

export default withAuthUser<EMServersDescriptionProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMServersDescriptionPage)
