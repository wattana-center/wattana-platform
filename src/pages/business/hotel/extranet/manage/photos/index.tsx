import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import { Container, Toolbar } from '@mui/material'

import BusinessImagesApi from '@app/apis/business-images-api'
import BusinessTagsApi from '@app/apis/business-tags-api'
import { ImagesResponseGetAll } from '@app/apis/interface/business-images-interface'
import ManagePhotos from '@app/components/model/manage/photos'
import { NextPage } from 'next'
import React from 'react'
import { TagsResponseGetAll } from '@app/apis/interface/business-tags-interface'
import TopbarMange from '@app/layout/Manage/TopbarMange'

type EMPhotosPageProps = {
  data: ImagesResponseGetAll
  tags: TagsResponseGetAll
}

const EMPhotosPage: NextPage<EMPhotosPageProps> = ({ data, tags }) => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <ManagePhotos data={data.data} tags={tags.data} />
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser, query }) => {
  const token = await AuthUser.getIdToken()

  if (!query.business_id) {
    return { notFound: true }
  }

  if (token) {
    const businessImagesApi = new BusinessImagesApi(
      { token: token },
      query.business_id as string
    )
    const businessTagsApi = new BusinessTagsApi(
      { token: token },
      query.business_id as string
    )

    try {
      const images = await businessImagesApi.getAll<ImagesResponseGetAll>({})
      const tags = await businessTagsApi.getAll<TagsResponseGetAll>({})

      const response = await Promise.all([images, tags])
      if (response) {
        return {
          props: {
            data: response[0].data,
            tags: response[1].data
          }
        }
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

export default withAuthUser<EMPhotosPageProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(EMPhotosPage)
