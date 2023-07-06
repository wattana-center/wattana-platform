import { Container, Toolbar } from '@mui/material'

import { Closed } from '@app/components/closed'
import React from 'react'
import TopbarMange from '@app/layout/Manage/TopbarMange'

const Policy = () => {
  return (
    <>
      <Toolbar />
      <TopbarMange />
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <Closed />
        {/* <ManageFacilities master={master} business={business} /> */}
      </Container>
    </>
  )
}

export default Policy
