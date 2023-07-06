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
  SelectChangeEvent,
  Switch
} from '@mui/material'
import {
  Images,
  ImagesRequestUpdate
} from '@app/apis/interface/business-images-interface'
import React, { useState } from 'react'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import BusinessImagesApi from '@app/apis/business-images-api'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

export type TagsOptions = {
  name: string
  id: number
}

export type FacilityOptions = {
  name: string
  id: number
}

interface PhotoEditModalProps {
  handleClose: () => void
  open: boolean
  image: Images
  handleOnChange: (data: Images) => void
  tags: TagsOptions[]
}

const PhotoEditModal: React.FC<PhotoEditModalProps> = ({
  open,
  handleClose,
  image,
  handleOnChange,
  tags
}) => {
  const [select, setSelect] = useState<string[]>([])
  const [current, setCurrent] = useState<Images>({ ...image })
  const authUser = useAuthUser()
  const router = useRouter()

  const handleChangeSelect = (event: SelectChangeEvent<string[]>) => {
    setSelect(event.target.value as string[])
  }

  const onChange = (data: Images) => {
    setCurrent(data)
  }

  const handleOnSave = async () => {
    const token = await authUser.getIdToken()
    if (token) {
      const request: ImagesRequestUpdate = {
        facility: current.facility,
        index: current.index,
        tags: select.map((t) => ({ id: parseInt(t) }))
      }
      const imagesApi = new BusinessImagesApi(
        { token: token },
        router.query.business_id as string
      )
      imagesApi
        .upload(request, current.id)
        .then((res) => {
          if (res.status === 200) {
            handleOnChange(res.data)
            // setImages([...images, res.data])
          }
        })
        .catch(() => {
          // alertError(e.message)
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
                    checked={current.index}
                    onChange={(e) => {
                      onChange({ ...current, index: e.target.checked })
                    }}
                  />
                }
                label="ภาพหลัก"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Switch
                    checked={current.facility}
                    onChange={(e) => {
                      onChange({ ...current, facility: e.target.checked })
                    }}
                  />
                }
                label="สิ่งอำนวยความสะดวกและบริการ"
              />
            </Grid>

            <Grid item>
              <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                <InputLabel htmlFor="max-width">เชื่อมโยง</InputLabel>
                <Select
                  multiple
                  autoFocus
                  value={select}
                  onChange={handleChangeSelect}
                  label="เชื่อมโยง"
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width'
                  }}>
                  <MenuItem value="" disabled>
                    none
                  </MenuItem>
                  {tags.map((v, k) => (
                    <MenuItem key={`option-rooms-${k}`} value={v.id}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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

export default withAuthUser<PhotoEditModalProps>()(PhotoEditModal)
