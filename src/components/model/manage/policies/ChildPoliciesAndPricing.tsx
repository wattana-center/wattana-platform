import { Card, CardContent, Grid, Typography } from '@mui/material'

import React from 'react'

const ChildPoliciesAndPricing: React.FC = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="column"
            sx={{ width: { md: 600, sm: '100%' } }}>
            <Grid item>
              <Typography variant="h5">ราคาและนโยบายเกี่ยวกับเด็ก</Typography>
            </Grid>
            <Grid item>
              <Typography>?</Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Typography>?</Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Typography variant="h5">ข้อมูลผู้เข้าพัก</Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Typography>อนุญาตให้นำสัตว์เลี้ยงเข้าพักไหม?</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ChildPoliciesAndPricing
