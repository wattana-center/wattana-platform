import { Chip, Grid, Icon, IconButton } from '@mui/material'

import Box from '@mui/material/Box'
import Image from 'next/image'
import { ImagesTag } from '@app/apis/interface/business-images-interface'
import React from 'react'

type CardImageProps = {
  src: string
  onHandleEdit: () => void
  onHandleDelete: () => void
  index: boolean
  facility: boolean
  tags: ImagesTag[]
}

const CardPhoto: React.FC<CardImageProps> = ({
  src,
  index,
  facility,
  tags,
  onHandleEdit,
  onHandleDelete
}) => {
  const name = () => {
    let child = []
    if (index) {
      child.push('ภาพหลัก')
    }

    if (facility) {
      child.push('สิ่งอำนวยความสะดวกและบริการ')
    }

    if (tags.length > 0) {
      const t = tags.map((v) => v.name)
      child = child.concat(t)
    }

    return child.map((i, k) => (
      <Grid item key={`Chip-${k}`} sx={{ p: 0.2 }}>
        <Chip
          label={i}
          sx={{ background: '#fff', color: '#000' }}
          variant="filled"
        />
      </Grid>
    ))
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
          }}>
          {name()}
          <Grid item style={{ marginLeft: 'auto' }}>
            <IconButton
              onClick={() => onHandleEdit()}
              sx={{ color: '#fff', p: 0.5 }}
              size="large">
              <Icon>edit</Icon>
            </IconButton>
            <IconButton
              onClick={() => onHandleDelete()}
              sx={{ color: '#fff', p: 0.5 }}
              size="large">
              <Icon>delete</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CardPhoto
