import { Card, CardContent, Grid, Icon, Typography } from '@mui/material'

import React from 'react'

type SummaryCardProps = {
  title: string
  count: string
  icon?: string
  iconColor?: string
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  count,
  icon,
  iconColor
}) => {
  return (
    <>
      <Card>
        <CardContent style={{ paddingBottom: 0 }}>
          <Grid container direction="column" spacing={1}>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography>{title}</Typography>
              </Grid>
              <Grid item>
                <Icon
                  style={{
                    color: iconColor,
                    display: icon ? 'block' : 'none'
                  }}>
                  {icon}
                </Icon>
              </Grid>
            </Grid>
            <Grid item textAlign="right">
              <Typography variant="h5">{count}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default SummaryCard
