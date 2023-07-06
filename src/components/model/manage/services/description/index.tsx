import { Link, Stack, Typography } from '@mui/material'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import BusinessServiceApi from '@app/apis/business-service-api'
import { Button } from '@mui/material'
import { ROOMSIGNERBEDS } from '@app/config/room'
import RoomBedType from './RoomBedType'
import RoomPrice from './RoomPrice'
import RoomSize from './RoomSize'
import RoomType from './RoomType'
import { ServiceData } from '@app/apis/interface/business-services-interface'
import { useRouter } from 'next/router'
import { useState } from 'react'

type RoomProps = {
  addRoomClose: () => void
  roomData: ServiceData
  insert?: boolean
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

const RoomDescription: React.FC<RoomProps> = ({ roomData, insert }) => {
  const authUser = useAuthUser()
  const router = useRouter()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()
  const alertError = useAlertError()
  const [room, setRoom] = useState<ServiceData>({ ...roomData })

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
        updateBusinessRegister()
      }, 500)
    }
    setHelperText(handle)
  }

  const updateBusinessRegister = async () => {
    if (router.query.id) {
      loadingAlert()
      const token = await authUser.getIdToken().then((token) => token)

      if (token) {
        const serviceApi = new BusinessServiceApi(
          { token: token },
          router.query.business_id as string
        )

        if (insert) {
          await serviceApi
            .insert(room)
            .then((res) => {
              alertSuccess('อัพเดทห้องพักสำเร็จ')
              setRoom({ ...res.data })
            })
            .catch((e) => {
              alertError(e.message)
            })
        } else {
          await serviceApi
            .update(room, router.query.id as string)
            .then((res) => {
              alertSuccess('อัพเดทห้องพักสำเร็จ')
              setRoom({ ...res.data })
            })
            .catch((e) => {
              alertError(e.message)
            })
        }
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
          {insert ? 'บันทึกห้องพัก' : 'อัพเดทห้องพัก'}
        </Button>
      </Stack>
    </>
  )
}

export default withAuthUser<RoomProps>()(RoomDescription)
