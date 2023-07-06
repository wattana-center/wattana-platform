import {
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  Typography
} from '@mui/material'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import BusinessRegisterApi from '@app/apis/business-register-api'
import { CardActionArea } from '@mui/material'
import { JoinActions } from '@app/redux-store/businessRegister'
import { RegisterData } from '@app/apis/interface/business-register-interface'
import RoomDescription from './description'
import { makeStyles } from '@mui/styles'
import router from 'next/router'
import { useState } from 'react'

const useStyles = makeStyles(() => ({
  iconBox: {
    zIndex: 100,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'gray',
    borderRadius: '50%',
    height: 32,
    width: 32
  },
  icon: {
    color: 'white',
    fontSize: '24px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

type RoomsIsEmptyProps = {
  addRoom: () => void
}

const RoomsIsEmpty = (props: RoomsIsEmptyProps) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Card>
            <Grid
              container
              direction="column"
              alignItems="center"
              p={3}
              spacing={1}>
              <Grid item>
                <Icon style={{ fontSize: '72px' }}>add_circle</Icon>
              </Grid>
              <Grid item>
                <Typography>
                  ท่านยังไม่ได้เพิ่มห้องให้กับที่พัก
                  เริ่มเพิ่มห้องเพื่อแจ้งข้อมูลตัวเลือกเตียง เลย์เอาท์
                  และราคาให้ลูกค้าทราบ
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => props.addRoom()}>
                  เพิ่มห้องพัก
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography>
                หลังจากลงทะเบียนเสร็จแล้ว
                ท่านสามารถปรับเปลี่ยนข้อมูลที่พักได้ก่อนเปิดให้จองออนไลน์
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

const JoinRooms = () => {
  const classess = useStyles()

  const [selectRoom, setSelectRoom] = useState<string | undefined>()
  const [showRooms, setShowRooms] = useState(false)
  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  const dispatch = useDispatch()
  const authUser = useAuthUser()
  // const loadingAlert = useLoadingAlert()
  // const alertSuccess = useAlertSuccess()

  const updateState = (changeData: RegisterData) => {
    dispatch(
      JoinActions.set({
        ...changeData
      })
    )

    return Promise.resolve()
  }

  const removeRoom = (id: string) => {
    const changeData = { ...busunessRegister }
    changeData.rooms = changeData.rooms.filter((v) => v.id !== id)

    updateState(changeData).then(async () => {
      if (router.query.id) {
        const token = await authUser.getIdToken().then((token) => token)

        if (token) {
          const businessApi = new BusinessRegisterApi({ token: token })
          const req = { ...changeData }
          await businessApi.update(
            { ...req, complete_persent: 40 },
            `${router.query.id}`
          )
        }
      }
    })
  }

  return (
    <>
      {showRooms ? (
        <RoomDescription
          insert={selectRoom == null ? true : false}
          roomId={selectRoom}
          addRoomClose={() => setShowRooms(false)}></RoomDescription>
      ) : (
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <Typography>ห้องพักและราคา</Typography>
          </Grid>
          <Grid item>
            <Typography>
              บอกข้อมูลเกี่ยวกับห้องแรกก่อน
              เมื่อท่านระบุข้อมูลทั้งหมดที่จำเป็นแล้ว
              ท่านก็จะสามารถกรอกข้อมูลให้ห้องอื่นได้
            </Typography>
          </Grid>
          <Grid item>
            <RoomsIsEmpty
              addRoom={() => {
                setShowRooms(true)
                setSelectRoom(undefined)
              }}
            />
          </Grid>
          {busunessRegister.rooms.map((v, k) => (
            <Grid item md={6} xs={12} key={`room-items-${k}`}>
              <Card>
                <CardActionArea>
                  <Grid container direction="column" p={3} spacing={2}>
                    <Grid item textAlign="center">
                      <Icon style={{ fontSize: '72px' }}>bedroom_child</Icon>
                    </Grid>
                    <Grid item>
                      <Typography>ประเภทห้องพัก {v.type}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>ชื่อห้องพัก {v.name}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>ราคา {v.default_cost}</Typography>
                    </Grid>
                  </Grid>
                  <div
                    onClick={() => {
                      removeRoom(v.id)
                    }}
                    className={classess.iconBox}>
                    <Icon className={classess.icon}>delete</Icon>
                  </div>
                  <div
                    onClick={() => {
                      setSelectRoom(v.id)
                      setShowRooms(true)
                    }}
                    className={classess.iconBox}
                    style={{ right: 50 }}>
                    <Icon className={classess.icon}>search</Icon>
                  </div>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default withAuthUser()(JoinRooms)
