import { Grid, Icon, IconButton } from '@mui/material'

import Box from '@mui/material/Box'
import Image from 'next/image'
import { RegisterRoomData } from '@app/apis/interface/business-register-interface'

type CardImageProps = {
  src: string
  type: string
  onHandleEdit: () => void
  onHandleDelete: () => void
  rooms: RegisterRoomData[]
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  type,
  rooms,
  onHandleEdit,
  onHandleDelete
}) => {
  const name = () => {
    if (type === 'HO') {
      return 'ภาพหลัก'
    } else if (type === 'FACILITY') {
      return 'สิ่งอำนวยความสะดวกและบริการ'
    } else {
      const s = type.split('#')
      if (s[0] === 'ROOM') {
        if (s[1]) {
          const f = rooms.find((f) => f.id === s[1])
          return 'ห้องพัก ' + f?.name
        } else {
          return 'ห้องพัก'
        }
      }
      return ''
    }
  }

  return (
    <>
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          height: 280,
          position: 'relative'
        }}>
        <Image
          width="100"
          height="100"
          layout="responsive"
          src={src}
          loading="lazy"
        />
        <Grid
          container
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            WebkitBoxAlign: 'center',
            alignItems: 'center',
            bottom: 0,
            color: '#fff',
            padding: 2
          }}
          justifyContent="space-between">
          <Grid item>{name()}</Grid>
          <Grid item>
            <IconButton
              onClick={() => onHandleEdit()}
              sx={{ color: '#fff' }}
              size="large">
              <Icon>edit</Icon>
            </IconButton>
            <IconButton
              onClick={() => onHandleDelete()}
              sx={{ color: '#fff' }}
              size="large">
              <Icon>delete</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CardImage
