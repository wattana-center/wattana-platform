import BusinessRegisterApi, {
  UploadImageRegisterApi
} from '@app/apis/business-register-api'
import { Grid, Typography } from '@mui/material'
import React, { ChangeEvent } from 'react'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import CardImage from '@app/components/card/image'
import FilesDropzone from '@app/components/filesDropzone'
import { ImagesData } from '@app/apis/interface/business-register-interface'
import { JoinActions } from '../../../../redux-store/businessRegister/index'
import PhotoEditModal from './PhotoEditModal'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const JoinPhoto = () => {
  const router = useRouter()
  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  const authUser = useAuthUser()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()
  const alertError = useAlertError()
  const dispatch = useDispatch()

  const [images, setImages] = useState<ImagesData[]>([])
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [item, setItem] = useState<ImagesData>()
  const handleCapture = (file: ChangeEvent<HTMLInputElement>) => {
    try {
      if (file.target.files && file.target.files[0]) {
        const request = {
          file: file.target.files[0],
          register_id: router.query.id as string,
          size: 'MD',
          type: images.length < 1 ? 'HO' : 'OO'
        }

        connectUploadApi(request)
      }
    } catch (_) {
      //
    }
  }

  const connectUploadApi = async (request: UploadImageRegisterApi) => {
    loadingAlert()
    const token = await authUser.getIdToken().then((token) => token)

    if (token) {
      const businessApi = new BusinessRegisterApi({ token: token })

      businessApi
        .uploadImage(request)
        .then((res) => {
          if (res.status === 200) {
            alertSuccess('เพิ่มรูปภาพเรียบร้อย')
            const current = [...busunessRegister.images, res.data]
            dispatch(
              JoinActions.update({
                ...busunessRegister,
                images: current
              })
            )
          }
        })
        .catch((e) => {
          alertError(e.message)
        })
    }
  }

  const connectDeleteApi = async (imageId: string) => {
    const token = await authUser.getIdToken().then((token) => token)

    if (token) {
      const businessApi = new BusinessRegisterApi({ token: token })

      businessApi
        .deleteImage(router.query.id as string, imageId)
        .then((res) => {
          if (res.status === 200) {
            const current = busunessRegister.images.filter(
              (v) => v.id !== imageId
            )
            dispatch(
              JoinActions.update({
                ...busunessRegister,
                images: current
              })
            )
          }
        })
        .catch((e) => {
          alertError(e.message)
        })
    }
  }

  const updateType = async (data: ImagesData[]) => {
    const token = await authUser.getIdToken().then((token) => token)

    if (token) {
      const businessApi = new BusinessRegisterApi({ token: token })
      const req = {
        ...busunessRegister,
        images: data
      }
      await businessApi.update(req, router.query.id as string)
    }
  }

  const onHandleDelete = (id: string) => {
    connectDeleteApi(id)
  }

  const onHandleEdit = (data: ImagesData) => {
    setItem(data)
    setModalShow(true)
  }

  const handleModalClose = () => {
    setModalShow(false)
  }

  const handleChangeType = (data: ImagesData) => {
    setItem(data)
    const index = busunessRegister.images.findIndex((v) => v.id === data.id)

    if (index > -1) {
      const current = [...busunessRegister.images]
      current[index] = data

      updateState(current).then(() => {
        updateType(current)
      })
    }
  }

  const updateState = (data: ImagesData[]) => {
    dispatch(
      JoinActions.update({
        ...busunessRegister,
        images: data
      })
    )

    return Promise.resolve()
  }

  useEffect(() => {
    setImages(busunessRegister.images)
  }, [busunessRegister.images])

  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography>ภาพถ่ายที่พัก</Typography>
        </Grid>
        <Grid item>
          <Typography>
            ภาพถ่ายคุณภาพดีช่วยดึงดูดลูกค้าให้มาสัมผัสภาพรวมที่พักของท่านอย่างเต็มที่
            ท่านจึงควรอัปโหลดภาพถ่ายความละเอียดสูงจำนวนหนึ่งที่ถ่ายทอดรายละเอียดต่าง
            ๆ ในที่พักของท่านได้อย่างครบถ้วน
            เราจะแสดงภาพเหล่านี้บนหน้าข้อมูลที่พักของท่านบนเว็บไซต์
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FilesDropzone handleCapture={handleCapture} />
        </Grid>
        <Grid item container spacing={1}>
          {images.map((v, k) => (
            <Grid item xs={12} md={4} key={`image-item-hotel-${k}`}>
              <CardImage
                rooms={busunessRegister.rooms}
                src={v.src}
                type={v.type}
                onHandleDelete={() => onHandleDelete(v.id)}
                onHandleEdit={() => onHandleEdit(v)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {item && (
        <PhotoEditModal
          open={modalShow}
          image={item}
          handleClose={handleModalClose}
          handleOnChange={handleChangeType}
          rooms={busunessRegister.rooms}
          facility={busunessRegister.facility.facilites}
        />
      )}
    </>
  )
}

export default withAuthUser()(JoinPhoto)
