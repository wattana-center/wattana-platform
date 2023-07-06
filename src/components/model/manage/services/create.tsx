import { Button, Link, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'

import BusinessServiceApi from '@app/apis/business-service-api'
import { ROOMSIGNERBEDS } from '@app/config/room'
import RoomBedType from './description/RoomBedType'
import RoomPrice from './description/RoomPrice'
import RoomSize from './description/RoomSize'
import RoomType from './description/RoomType'
import { ServiceData } from '@app/apis/interface/business-services-interface'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'

type ManageServicesProps = {
  // data?: ServiceData
}

export type HelperText = {
  name: string
  type: string
  smoking: string
  number: string
  stays: string
  size: string
  default_cost: string
  discount: string
  discount_min_stays: string
  beds: {
    type: string
    number: string
  }[]
}

const clearHelper: HelperText = {
  name: '',
  type: '',
  smoking: '',
  number: '',
  stays: '',
  size: '',
  default_cost: '',
  discount: '',
  discount_min_stays: '',
  beds: [
    {
      type: '',
      number: ''
    }
  ]
}

const clearRoom = {
  id: 0,
  business_id: 0,
  service_type_id: 1,
  booking_online: false,
  name: '',
  max_pax: 1,
  max_adults: 1,
  max_children: 1,
  stays: 1,
  smoking: '',
  type: '',
  size: 0,
  number: 1,
  default_cost: 0,
  discount: 0,
  discount_min_stays: 0,
  beds: [],
  service_type: { name: '' },
  tags: [],
  images: []
}

const ManageServicesCreate: React.FC<ManageServicesProps> = ({}) => {
  const router = useRouter()
  const authUser = useAuthUser()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()
  const alertError = useAlertError()

  const [room, setRoom] = useState<ServiceData>({ ...clearRoom })

  const [helperText, setHelperText] = useState<HelperText>({
    ...clearHelper
  })

  const handleOnSaveRoom = () => {
    const handle = { ...clearHelper }
    let handleStatus = true
    if (room.name == '') {
      handleStatus = false
      handle.name = 'กรุณากรอกชื่อห้องพัก'
    }

    if (room.type == '') {
      handleStatus = false
      handle.type = 'กรุณาเลือกประเภทห้องพัก'
    } else if (ROOMSIGNERBEDS.indexOf(room.type) === -1) {
      if (room.beds.length > 1) {
        for (let i = 0; i < room.beds.length; i++) {
          if (room.beds[i].type == '') {
            handleStatus = false
            handle.beds[i].type = 'ประเภทเตียงของห้องพักไม่ถูกต้อง'
          }

          if (room.beds[i].number > 0) {
            handleStatus = false
            handle.beds[i].number = 'จำนวนไม่ถูกต้อง'
          }
        }
      }
    }

    if (room.smoking == '') {
      handleStatus = false
      handle.smoking = 'กรุณาเลือกนโยบายการสูบบุหรี่'
    }

    if (room.stays < 1) {
      handleStatus = false
      handle.stays = 'จำนวนห้องพักไม่ถูกต้อง'
    }

    if (room.default_cost < 1) {
      handleStatus = false
      handle.default_cost = 'ราคาห้องพักไม่ถูกต้อง'
    }

    if (handleStatus) {
      setTimeout(() => {
        insertBusinessRegister()
      }, 500)
    }
    setHelperText(handle)
  }

  const insertBusinessRegister = async () => {
    if (router.query.business_id) {
      loadingAlert()
      const token = await authUser.getIdToken().then((token) => token)

      if (token) {
        const serviceApi = new BusinessServiceApi(
          { token: token },
          router.query.business_id as string
        )

        await serviceApi
          .insert(room)
          .then((res) => {
            alertSuccess('บันทึกห้องพักสำเร็จ').then(() => {
              router.back()
            })
            setRoom({ ...res.data })
          })
          .catch((e) => {
            alertError(e.message)
          })
      }
    }
  }

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography>เลย์เอาท์และราคา</Typography>
        <Link aria-readonly onClick={() => router.back()}>
          กลับไปหน้าข้อมูลโดยรวม
        </Link>
        <RoomType room={room} setRoom={setRoom} helperText={helperText} />
        <RoomBedType room={room} setRoom={setRoom} helperText={helperText} />
        <RoomSize room={room} setRoom={setRoom} helperText={helperText} />
        <RoomPrice room={room} setRoom={setRoom} helperText={helperText} />
        <Button variant="contained" onClick={handleOnSaveRoom}>
          บันทึกห้องพัก
        </Button>
      </Stack>
    </>
  )
}

export default ManageServicesCreate
