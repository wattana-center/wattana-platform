import { Icon, Typography } from '@mui/material'
import React, { ChangeEvent, useRef } from 'react'

import Box from '@mui/material/Box'
import { Grid } from '@mui/material'

type FilesDropzoneProps = {
  handleCapture: (file: ChangeEvent<HTMLInputElement>) => void
}

const FilesDropzone: React.FC<FilesDropzoneProps> = ({ handleCapture }) => {
  const input = useRef<HTMLInputElement>(null)
  return (
    <>
      <div>
        <input
          ref={input}
          accept="image/*"
          type="file"
          id="icon-button-photo"
          hidden
          onChange={handleCapture}
        />
        <label htmlFor="icon-button-photo">
          <Box
            sx={{
              p: 2,
              border: '1px dashed grey',
              cursor: 'pointer'
            }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Icon>add</Icon>
              </Grid>
              <Grid item>
                <Typography>เพิ่มรูปภาพ</Typography>
              </Grid>
            </Grid>
          </Box>
        </label>
      </div>
    </>
  )
}

export default FilesDropzone
