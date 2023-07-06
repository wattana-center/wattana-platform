import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Typography
} from '@mui/material'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import BusinessServiceApi from '@app/apis/business-service-api'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import { ServiceData } from '@app/apis/interface/business-services-interface'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const useStyles = makeStyles(() => ({
  iconBox: {
    cursor: 'unset',
    zIndex: 100,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'gray',
    borderRadius: '50%',
    height: 32,
    width: 32,
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none'
    }
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

type ManageServicesProps = {
  data: ServiceData[]
}

const ManageServices: React.FC<ManageServicesProps> = ({ data }) => {
  const classess = useStyles()
  const router = useRouter()
  const authUser = useAuthUser()

  const [rooms, setRooms] = useState<ServiceData[]>([...data])

  const onHandleDelete = async (id: number) => {
    const token = await authUser.getIdToken().then((token) => token)

    if (token) {
      const serviceApi = new BusinessServiceApi(
        { token: token },
        router.query.business_id as string
      )

      serviceApi.delete(`${id}`).then((res) => {
        if (res.status === 200) {
          const current = rooms.filter((r) => r.id !== id)
          setRooms(current)
        }
      })
    }
  }

  useEffect(() => {
    setRooms([...data])
  }, [data])

  return <>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">ห้องพัก</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            minHeight: 72,
            backgroundColor: WattanaTheme.palette.primary.main,
            color: '#fff'
          }}>
          <CardActionArea
            onClick={() => {
              router.push({
                pathname:
                  ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                    .ROOMS_CREATE,
                query: {
                  business_id: router.query.business_id
                }
              })
            }}>
            <Grid
              sx={{
                height: 172
              }}
              container
              direction="column"
              spacing={1}
              alignItems="center"
              justifyContent="center">
              <Grid item>
                <Typography variant="h5">สร้างห้องพักใหม่</Typography>
              </Grid>
              <Grid item>
                <Icon style={{ fontSize: 72 }}>add_circle</Icon>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        {rooms.map((v, k) => (
          <Grid item md={6} xs={12} key={`room-items-${k}`}>
            <Card>
              <CardMedia
                sx={{ height: 322 }}
                image={
                  v.images && v.images.length > 0
                    ? v.images[0].src
                    : '/image/assets/no_image_available.jpeg'
                }></CardMedia>
              <CardContent sx={{ position: 'relative' }}>
                <Grid container direction="column" spacing={1}>
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
                <IconButton
                  onClick={() => {
                    onHandleDelete(v.id)
                  }}
                  className={classess.iconBox}
                  size="large">
                  <Icon className={classess.icon}>delete</Icon>
                </IconButton>
                <IconButton
                  onClick={() => {
                    router.push({
                      pathname:
                        ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                          .ROOMS + `/${v.id}`,
                      query: { business_id: router.query.business_id }
                    })
                  }}
                  className={classess.iconBox}
                  style={{ right: 50 }}
                  size="large">
                  <Icon className={classess.icon}>search</Icon>
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </>;
}

export default withAuthUser<ManageServicesProps>()(ManageServices)
