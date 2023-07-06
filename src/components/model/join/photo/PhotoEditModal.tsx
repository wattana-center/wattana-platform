import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch
} from '@mui/material'
import {
  ImagesData,
  RegisterRoomData
} from '@app/apis/interface/business-register-interface'

import { Grid } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

interface PhotoEditModalProps {
  handleClose: () => void
  open: boolean
  image: ImagesData
  handleOnChange: (data: ImagesData) => void
  rooms: RegisterRoomData[]
  facility: string[]
}

const PhotoEditModal: React.FC<PhotoEditModalProps> = ({
  open,
  handleClose,
  image,
  handleOnChange,
  rooms
}) => {
  const [type, setType] = useState<'room' | 'facility' | '' | 'HO'>('')
  const [room, setRoom] = useState<string>('')

  useEffect(() => {
    if (image.type === 'FACILITY') {
      setType('facility')
    } else {
      const s = image.type.split('#')
      if (s[0] === 'ROOM') {
        setType('room')
        setRoom(s[1])
      } else if (image.type === 'HO') {
        setType('HO')
      } else {
        setType('')
        setRoom('')
      }
    }
  }, [image])

  const handleOnSave = () => {
    if (room !== '') {
      handleOnChange({
        ...image,
        type: 'ROOM#' + room
      })
    } else if (type === 'facility') {
      handleOnChange({
        ...image,
        type: 'FACILITY'
      })
    } else if (type === 'HO') {
      handleOnChange({
        ...image,
        type: type
      })
    }

    handleClose()
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="image-dialog-change-type">
        <DialogTitle id="image-dialog-change-type">
          ปรับแต่ง Option รูปภาพ
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Switch
                    checked={type === 'HO' ? true : false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setType('HO')
                      } else {
                        setType('')
                      }
                    }}
                  />
                }
                label="ภาพหลัก"
              />
            </Grid>

            {image.type !== 'HO' && (
              <Grid item>
                <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                  <InputLabel htmlFor="max-width">
                    ระบุประเภทของรูปภาพ
                  </InputLabel>
                  <Select
                    autoFocus
                    value={type}
                    onChange={(e) => {
                      if (
                        e.target.value === 'room' ||
                        e.target.value === 'facility' ||
                        e.target.value === '' ||
                        e.target.value === 'HO'
                      ) {
                        setType(e.target.value)
                      }
                    }}
                    label="ระบุประเภทของรูปภาพ"
                    inputProps={{
                      name: 'max-width',
                      id: 'max-width'
                    }}>
                    <MenuItem value="" disabled>
                      none
                    </MenuItem>
                    <MenuItem value="room">ห้องพัก</MenuItem>
                    <MenuItem value="facility">
                      สิ่งอำนวยความสะดวกและบริการ
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {type === 'room' && (
              <Grid item>
                <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                  <InputLabel htmlFor="max-width">ระบุห้องพัก</InputLabel>
                  <Select
                    autoFocus
                    value={room}
                    onChange={(e) => {
                      setRoom(e.target.value)
                    }}
                    label="ระบุห้องพัก"
                    inputProps={{
                      name: 'max-width',
                      id: 'max-width'
                    }}>
                    <MenuItem value="" disabled>
                      none
                    </MenuItem>
                    {rooms.map((v, k) => (
                      <MenuItem key={`option-rooms-${k}`} value={v.id}>
                        {v.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnSave}>Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PhotoEditModal
