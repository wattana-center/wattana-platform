import { Link, Stack, Typography } from '@mui/material'
import {
  RegisterData,
  RegisterRoomData
} from '@app/apis/interface/business-register-interface'
import { useAlertSuccess, useLoadingAlert } from '@app/helpers/useSweetAlert2'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import BusinessRegisterApi from '@app/apis/business-register-api'
import { Button } from '@mui/material'
import { JoinActions } from '@app/redux-store/businessRegister'
import { ROOMSIGNERBEDS } from '@app/config/room'
import RoomBedType from './RoomBedType'
import RoomPrice from './RoomPrice'
import RoomSize from './RoomSize'
import RoomType from './RoomType'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type RoomProps = {
  addRoomClose: () => void
  roomId?: string
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

const clearRoom = {
  id: '',
  name: '',
  type: '',
  smoking: '',
  number: 0,
  stays: 1,
  size: 0,
  default_cost: 0,
  discount: 0,
  discount_min_stays: 0,
  beds: [
    {
      type: '',
      number: 0
    }
  ]
}

const RoomDescription: React.FC<RoomProps> = (props) => {
  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  const authUser = useAuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()

  const [room, setRoom] = useState<RegisterRoomData>({ ...clearRoom })

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

          if (room.beds[i].number < 1) {
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

    // if (room.discount < 1) {
    //   handleStatus = false
    //   handle.discount = 'ราคาห้องพักไม่ถูกต้อง'
    // }

    if (handleStatus) {
      setTimeout(() => {
        updateBusinessRegister()
      }, 500)
    }
    setHelperText(handle)
  }

  const updateState = (data: RegisterData) => {
    dispatch(
      JoinActions.set({
        ...data
      })
    )

    return Promise.resolve()
  }

  const updateBusinessRegister = async () => {
    if (router.query.id) {
      loadingAlert()
      const token = await authUser.getIdToken().then((token) => token)

      if (token) {
        const businessApi = new BusinessRegisterApi({ token: token })

        if (props.insert) {
          const req = { ...busunessRegister }
          room.id = uuidv4()
          req.rooms = [...req.rooms, room]
          updateState(req).then(() => {
            businessApi
              .update({ ...req, complete_persent: 40 }, `${router.query.id}`)
              .then(() => {
                alertSuccess(`บันทึกข้อมูลสำเร็จ`).then(() => {
                  props.addRoomClose()
                })
              })
          })
        } else {
          const req = { ...busunessRegister }
          const index = req.rooms.findIndex((v) => v.id === room.id)
          req.rooms[index] = room
          updateState(req).then(() => {
            businessApi
              .update({ ...req, complete_persent: 40 }, `${router.query.id}`)
              .then(() => {
                alertSuccess(`อัพเดทข้อมูลสำเร็จ`).then(() => {
                  props.addRoomClose()
                })
              })
          })
        }
      }
    }
  }

  useEffect(() => {
    if (props.roomId != null) {
      const findRoom = busunessRegister.rooms.find((i) => i.id === props.roomId)
      if (findRoom) {
        setRoom({
          ...findRoom
        })
      }
    }
  }, [props])

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography>เลย์เอาท์และราคา</Typography>
        <Link aria-readonly onClick={() => props.addRoomClose()}>
          กลับไปหน้าข้อมูลโดยรวม
        </Link>
        <RoomType room={room} setRoom={setRoom} helperText={helperText} />
        <RoomBedType room={room} setRoom={setRoom} helperText={helperText} />
        <RoomSize room={room} setRoom={setRoom} helperText={helperText} />
        <RoomPrice room={room} setRoom={setRoom} helperText={helperText} />
        <Button variant="contained" onClick={handleOnSaveRoom}>
          {props.insert ? 'บันทึกห้องพัก' : 'อัพเดทห้องพัก'}
        </Button>
      </Stack>
    </>
  )
}

export default withAuthUser<RoomProps>()(RoomDescription)
