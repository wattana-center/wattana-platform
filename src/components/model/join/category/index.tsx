import { Grid, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import CATEGORY from '@app/config/category'
import CardCategory from '@app/components/card/category'
import { JoinActions } from '@app/redux-store/businessRegister'
import React from 'react'

type CategoryProps = {
  onClick?: () => void
}

const Category: React.FC<CategoryProps> = () => {
  // const { onClick } = props
  const theme = useTheme()

  const responsive = useMediaQuery(theme.breakpoints.down('lg'))
  const dispatch = useDispatch()
  const busunessRegister = useSelector((state) => state.busunessRegister)
  const handleOnClick = (type: string) => {
    dispatch(
      JoinActions.set({
        ...busunessRegister.data,
        business_type: type
      })
    )

    // if (onClick) onClick()
  }

  return (
    <>
      <Grid
        container
        direction={responsive ? 'column' : 'row'}
        alignItems="stretch"
        // justifyItems="stretch"
        spacing={2}>
        {CATEGORY.map((item, index) => (
          <Grid item xs={12} md={3} key={`card-category-${index}`}>
            <CardCategory
              onSelect={busunessRegister.data.business_type === item.name}
              fullWidth
              image={item.image}
              name={item.name}
              alt={item.alt}
              desc={item.desc}
              onClick={() => {
                handleOnClick(item.name)
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Category
