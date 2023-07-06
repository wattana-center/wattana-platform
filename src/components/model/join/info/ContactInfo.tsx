import {
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import { JoinActions } from '@app/redux-store/businessRegister'
import React from 'react'

const ContactInfo: React.FC = () => {
  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  const dispatch = useDispatch()

  const handleChangeChain = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(()
    const value = (event.target as HTMLInputElement).value
    let b = false
    if (value === 'true') {
      b = true
    } else {
      b = false
    }

    dispatch(
      JoinActions.set({
        ...busunessRegister,
        contact: {
          ...busunessRegister.contact,
          chain: b
        }
      })
    )
  }

  const handleChangeContactName = (value: string) => {
    dispatch(
      JoinActions.set({
        ...busunessRegister,
        contact: {
          ...busunessRegister.contact,
          name: value
        }
      })
    )
  }

  const handleChangeContactPhone = (value: string) => {
    dispatch(
      JoinActions.set({
        ...busunessRegister,
        contact: {
          ...busunessRegister.contact,
          phone_number: value
        }
      })
    )
  }

  const handleChangeContactPhoneMore = (value: string) => {
    dispatch(
      JoinActions.set({
        ...busunessRegister,
        contact: {
          ...busunessRegister.contact,
          phone_number_more: value
        }
      })
    )
  }

  return (
    <>
      <Card>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Grid container direction="column" p={2} spacing={1}>
              {/*  */}
              <Grid item>
                <Typography>โปรดระบุข้อมูลสำหรับติดต่อที่พัก</Typography>
              </Grid>
              {/*  */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>ชื่อผู้ติดต่อ</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={busunessRegister.contact.name}
                      onChange={(e) => handleChangeContactName(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/*  */}
              <Grid item>
                <Typography>
                  หมายเลขติดต่อ
                  (เพื่อที่เราจะสามารถให้ความช่วยเหลือเกี่ยวกับการลงทะเบียนของท่านได้ในกรณีจำเป็น)
                </Typography>
              </Grid>

              {/*  */}
              <Grid container item spacing={3} justifyContent="space-between">
                <Grid item md={6} xs={12}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography>หมายเลขโทรศัพท์</Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        fullWidth
                        value={busunessRegister.contact.phone_number}
                        onChange={(e) =>
                          handleChangeContactPhone(e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography>
                        หมายเลขโทรศัพท์เพิ่มเติม (ระบุหรือไม่ก็ได้)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        fullWidth
                        value={busunessRegister.contact.phone_number_more}
                        onChange={(e) =>
                          handleChangeContactPhoneMore(e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/*  */}
              <Grid item>
                <Typography>
                  ท่านมีโรงแรมหลายแห่ง
                  หรือเป็นส่วนหนึ่งของบริษัทหรือกลุ่มบริษัทจัดการอสังหาริมทรัพย์
                  (Property Management Company) หรือไม่?
                </Typography>
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="chain"
                    defaultValue="false"
                    value={`${busunessRegister.contact.chain}`}
                    name="chain-buttons-group"
                    onChange={handleChangeChain}>
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="ไม่"
                    />
                    <FormControlLabel
                      value={'true'}
                      control={<Radio />}
                      label="ใช่"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default ContactInfo
