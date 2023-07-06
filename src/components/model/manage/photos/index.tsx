import BusinessImagesApi, {
  UploadImageApi
} from '@app/apis/business-images-api'
import { Grid, Typography } from '@mui/material'
import PhotoEditModal, { TagsOptions } from './PhotoEditModal'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'

import CardPhoto from './CardPhoto'
import FilesDropzone from '@app/components/filesDropzone'
import { Images } from '@app/apis/interface/business-images-interface'
import { Tag } from '@app/apis/interface/business-tags-interface'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'

type ManagePhotosProps = {
  data: Images[]
  tags: Tag[]
}

const ManagePhotos: React.FC<ManagePhotosProps> = ({ data, tags }) => {
  const router = useRouter()
  const authUser = useAuthUser()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()
  const alertError = useAlertError()

  const [images, setImages] = useState<Images[]>(data)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [item, setItem] = useState<Images>()
  const [roomOptions, setRoomOptions] = useState<TagsOptions[]>([])
  const handleCapture = (file: ChangeEvent<HTMLInputElement>) => {
    try {
      if (file.target.files && file.target.files[0]) {
        const request = {
          file: file.target.files[0],
          business_id: router.query.business_id as string,
          size: 'MD',
          type: images.length < 1 ? 'HO' : 'OO',
          index: false
        }
        connectUploadApi(request)
      }
    } catch (_) {
      //
    }
  }

  const connectUploadApi = async (request: UploadImageApi) => {
    loadingAlert()
    const token = await authUser.getIdToken().then((token) => token)

    if (token) {
      const imagesApi = new BusinessImagesApi(
        { token: token },
        router.query.business_id as string
      )
      imagesApi
        .uploadImage(request)
        .then((res) => {
          if (res.status === 200) {
            alertSuccess('เพิ่มรูปภาพเรียบร้อย')
            setImages([...images, res.data])
          }
        })
        .catch((e) => {
          alertError(e.message)
        })
    }
  }

  const connectDeleteApi = async (imageId: number) => {
    const token = await authUser.getIdToken().then((token) => token)

    if (token) {
      const imagesApi = new BusinessImagesApi(
        { token: token },
        router.query.business_id as string
      )
      imagesApi
        .deleteImage(imageId)
        .then((res) => {
          if (res.status === 200) {
            const current = images.filter((v) => v.id !== imageId)
            setImages(current)
          }
        })
        .catch((e) => {
          alertError(e.message)
        })
    }
  }

  // const updateType = async (data: Images[]) => {
  //   const token = await authUser.getIdToken().then((token) => token)

  //   if (token) {
  //     // const businessApi = new BusinessRegisterApi({ token: token })
  //     // const req = {
  //     //   ...busunessRegister,
  //     //   images: data
  //     // }
  //     // await businessApi.update(req, router.query.id as string)
  //   }
  // }

  const onHandleDelete = (id: number) => {
    connectDeleteApi(id)
  }

  const onHandleEdit = (data: Images) => {
    setItem(data)
    setModalShow(true)
  }

  const handleModalClose = () => {
    setModalShow(false)
  }

  const handleChangeType = (data: Images) => {
    const index = images.findIndex((v) => v.id === data.id)

    if (index > -1) {
      const current = [...images]
      current[index] = data

      setImages(current)
    }

    setItem(data)
  }

  useEffect(() => {
    if (tags.length > 0) {
      const r = tags.map((s) => ({ name: s.name, id: s.id }))
      setRoomOptions(r)
    }
  }, [tags])

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
              <CardPhoto
                src={v.src}
                index={v.index}
                facility={v.facility}
                tags={v.tags != null ? v.tags : []}
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
          tags={roomOptions}
        />
      )}
    </>
  )
}

export default ManagePhotos
