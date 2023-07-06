import { Button, Card, Grid, Typography, useTheme } from '@mui/material'

import Image from 'next/image'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'

type CardCategoryProps = {
  alt: string
  image: string
  name: string
  desc: string
  fullWidth?: boolean
  onClick?: () => void
  onSelect?: boolean
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%'
  },
  selection: {
    border: '2px solid',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
  }
}))

const CardCategory: React.FC<CardCategoryProps> = (props) => {
  const classess = useStyles()
  const theme = useTheme()

  const { fullWidth = false, onSelect = false } = props

  return (
    <>
      <Card
        className={clsx(
          fullWidth ? classess.root : {},
          onSelect ? classess.selection : {}
        )}>
        {/* <CardContent sx={{ height: '100%' }}> */}
        <Grid
          container
          direction="column"
          sx={{ height: '100%', padding: theme.spacing(2) }}
          justifyContent="space-between">
          <Grid item style={{ textAlign: 'center' }}>
            <div style={{ height: 160 }}>
              <Image
                width="100"
                height="100"
                layout="responsive"
                src={props.image}
                alt={props.alt}
              />
            </div>
          </Grid>
          <Grid item>
            <Typography textAlign="center" variant="h6">
              {props.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography textAlign="center" variant="body1">
              {props.desc}
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: 30 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                if (props.onClick) props.onClick()
              }}>
              ลงทะเบียนที่พักของท่าน
            </Button>
          </Grid>
        </Grid>
        {/* </CardContent> */}
      </Card>
    </>
  )
}

export default CardCategory
