import { AuthAction, withAuthUser } from 'next-firebase-auth'
import {
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

import ItemsBusiness from '@app/components/model/main/open'
import ItemsBusinessPaddingRegister from '@app/components/model/main/padding'
import JoinBusiness from '@app/components/model/join/Business'

// import ROUTESPATH from '@app/config/routes-path'
// import { useRouter } from 'next/router'

const GroupHomePage = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Toolbar />
      <Container
        maxWidth="lg"
        style={{
          paddingTop: 20,
          background: '#fff',
          height: '100%',
          flex: '1'
        }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}>
          <Typography variant="h5">หน้าหลัก</Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setOpenModal(true)
            }}>
            เพิ่มที่พักใหม่
          </Button>
        </Stack>

        <Grid container mt={2}>
          <Grid item>
            <Typography variant="h5">
              ที่พักที่อยู่ระหว่างดำเนินการลงทะเบียน (1)
            </Typography>
          </Grid>
          <Grid item container mt={1}>
            <ItemsBusinessPaddingRegister />
          </Grid>
        </Grid>

        <Grid container mt={2}>
          <Grid item>
            <Typography variant="h5">ที่พักซึ่งเปิดให้จองแล้ว</Typography>
          </Grid>
          <Grid item container mt={1}>
            <ItemsBusiness />
          </Grid>
        </Grid>
      </Container>
      <JoinBusiness
        open={openModal}
        handleClose={() => {
          setOpenModal(false)
        }}
      />
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(GroupHomePage)
