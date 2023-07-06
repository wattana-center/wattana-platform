import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { Container, Toolbar } from '@mui/material'

import BusinessApi from '@app/apis/business-api'
import BusinessFacilityApi from '@app/apis/business-facility'
import { BusinessResponseGet } from '@app/apis/interface/business-interface'
import FacilityMasterApi from '@app/apis/facility-master-api'
import { FacilityMasterResponseGetAll } from '@app/apis/interface/facility-master-interface'
import { FacilityResponseGetAll } from '@app/apis/interface/business-facility'
import { NextPage } from 'next'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import TopbarMange from '@app/layout/Manage/TopbarMange'
import dynamic from 'next/dynamic'

const ManageFacilities = dynamic(
  () => import('@app/components/model/manage/facilities')
)

type EMFacilitiesPageProps = {
  master: FacilityMasterResponseGetAll
  business: BusinessResponseGet
  facility: FacilityResponseGetAll
}

const EMFacilitiesPage: NextPage<EMFacilitiesPageProps> = ({
  master,
  business,
  facility
}) => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <ManageFacilities
          masterData={master.data}
          businessData={business}
          facilityData={facility.data}
        />
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

  const facilityMasterApi = new FacilityMasterApi({ token: token })
  const businessApi = new BusinessApi({ token: token })
  const facilityApi = new BusinessFacilityApi(
    { token: token },
    query.business_id as string
  )
  try {
    const business = await businessApi.get<BusinessResponseGet>(
      query.business_id as string
    )
    const master = await facilityMasterApi.getAll<FacilityMasterResponseGetAll>(
      {}
    )
    const facility = await facilityApi.getAll<FacilityResponseGetAll>({})

    const response = await Promise.all([business, master, facility])

    if (response[0].status === 200 && response[1].status === 200) {
      return {
        props: {
          business: response[0].data,
          master: response[1].data,
          facility: response[2].data
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

export default withAuthUser<EMFacilitiesPageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMFacilitiesPage)
