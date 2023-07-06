import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import BusinessGroupApi from '@app/apis/business-group'
import BusinessRegisterApi from '@app/apis/business-register-api'
import { GroupGetAllRes } from '@app/apis/interface/business-group-interface'
import { InitialBusinessRegister } from '@app/redux-store/businessRegister'
import { LoadingButton } from '@mui/lab'
import ROUTESPATH from '@app/config/routes-path'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import validator from 'validator'

type JoinBusinessProps = {
  open: boolean
  handleClose: () => void
}

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: WattanaTheme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: WattanaTheme.shadows[5],
    padding: WattanaTheme.spacing(2, 4, 3)
  }
}))

type JoinBusinessModal = {
  name: string
  owner: string
  email: string
  group: string
}

type Option = {
  label: string
  value: string
}

const JoinBusiness = (props: JoinBusinessProps) => {
  const { open, handleClose } = props

  const classes = useStyles()

  const authUser = useAuthUser()
  const router = useRouter()

  const [form, setForm] = useState<JoinBusinessModal>({
    name: '',
    owner: '',
    email: '',
    group: ''
  })

  const [helperText, setHelperText] = useState<JoinBusinessModal>({
    name: '',
    owner: '',
    email: '',
    group: ''
  })

  const [group, setGroup] = useState<Option[]>([])
  const [value, setValue] = useState<Option | null>(null)
  const [loading, setLoading] = useState(false)

  const onHandleGroupChange = (event: any, newValue: any) => {
    setValue(newValue)

    if (newValue.value) {
      setForm({
        ...form,
        group: newValue.value
      })
    }
  }

  const onHandleRegister = async () => {
    if (validateForm()) {
      setLoading(true)
      const token = await authUser.getIdToken().then((token) => token)

      if (token) {
        const businessApi = new BusinessRegisterApi({ token: token })

        businessApi
          .save({
            name: form.name,
            email: form.email,
            owner: form.owner,
            group: parseInt(form.group),
            data: {
              ...InitialBusinessRegister.data,
              name: form.name,
              contact: {
                name: form.name,
                chain: false,
                phone_number: '',
                phone_number_more: ''
              }
            }
          })
          .then((res) => {
            router.push(
              ROUTESPATH.BUSINESS.HOTEL.JOIN.CATEGORY.replace(
                '{id}',
                `${res.data.id}`
              )
            )
          })
          .catch((e) => {
            setHelperText({
              ...helperText,
              group: e.message
            })
            setTimeout(() => {
              setLoading(false)
            }, 1000)
          })
      }
    }
  }

  const validateForm = () => {
    let status = true
    setHelperText({
      name: '',
      owner: '',
      email: '',
      group: ''
    })

    if (form.name.length < 1) {
      setHelperText((prevState) => ({
        ...prevState,
        name: 'กรุณากรอกชื่อที่พัก'
      }))

      status = false
    }

    if (!validator.isEmail(form.email)) {
      setHelperText((prevState) => ({
        ...prevState,
        email: 'รูปแบบอีเมลไม่ถูกต้อง'
      }))

      status = false
    }

    if (validator.isEmpty(form.owner)) {
      setHelperText((prevState) => ({
        ...prevState,
        owner: 'กรุณากรอกชื่อและนามสกุลของท่าน'
      }))

      status = false
    }

    if (
      authUser.claims['is_admin'] === false &&
      validator.isEmpty(form.group)
    ) {
      setHelperText((prevState) => ({
        ...prevState,
        group: 'กรุณาผู้สร้าง'
      }))

      status = false
    }

    return status
  }

  const getInit = async (businessItems: any) => {
    setLoading(true)
    const token = await authUser.getIdToken()
    if (token) {
      const businessGroupApi = new BusinessGroupApi({ token: token })
      const ids = businessItems.toString()

      businessGroupApi
        .getAll<GroupGetAllRes>({ ids: ids })
        .then((res) => {
          if (res.status === 200) {
            const items = res.data.data.map((v) => ({
              label: v.name != null ? v.name : v.owner,
              value: v.id.toString()
            }))
            setGroup(items)
          }
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        })
    }
  }

  useEffect(() => {
    return () => {
      setHelperText({
        name: '',
        owner: '',
        email: '',
        group: ''
      })
    }
  }, [open])

  useEffect(() => {
    const businessItems = authUser.claims.business

    getInit(businessItems)
  }, [authUser])

  useEffect(() => {
    if (group.length > 0) {
      setValue(group[0])
      setForm({
        ...form,
        group: group[0].value
      })
    }
  }, [group])

  return (
    <>
      {authUser && (
        <Modal
          open={open}
          onClose={handleClose}
          // aria-labelledby="simple-modal-title"
          // aria-describedby="simple-modal-description"
          className={classes.modal}>
          <Container maxWidth="sm" style={{ zIndex: 1500 }}>
            <Card>
              <CardHeader title="เพิ่มที่พัก" />
              <CardContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item container direction="column">
                    <Grid item>
                      <Typography variant="body1">ชื่อที่พัก</Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        value={form.name}
                        onChange={(e) => {
                          setForm((prevState) => ({
                            ...prevState,
                            name: e.target.value
                          }))
                        }}
                        fullWidth
                        placeholder="กรอกชื่อที่พักของท่าน"
                        helperText={helperText.name}
                        error={helperText.name === '' ? false : true}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container direction="column">
                    <Grid item>
                      <Typography variant="body1">
                        ชื่อและนามสกุลของท่าน
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        value={form.owner}
                        onChange={(e) => {
                          setForm((prevState) => ({
                            ...prevState,
                            owner: e.target.value
                          }))
                        }}
                        fullWidth
                        placeholder="กรอกชื่อและนามสกุลเจ้าของ"
                        helperText={helperText.owner}
                        error={helperText.owner === '' ? false : true}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container direction="column">
                    <Grid item>
                      <Typography variant="body1">
                        ที่อยู่อีเมลของท่าน
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        value={form.email}
                        onChange={(e) => {
                          setForm((prevState) => ({
                            ...prevState,
                            email: e.target.value
                          }))
                        }}
                        fullWidth
                        placeholder="กรอกที่อยู่อีเมลของท่าน"
                        helperText={helperText.email}
                        error={helperText.email === '' ? false : true}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container direction="column">
                    <Grid item>
                      <Typography variant="body1">สร้างโดย</Typography>
                    </Grid>
                    <Grid item>
                      <FormControl
                        fullWidth
                        error={
                          helperText.group
                            ? helperText.group == ''
                              ? false
                              : true
                            : false
                        }>
                        <Autocomplete
                          fullWidth
                          value={value}
                          onChange={onHandleGroupChange}
                          options={group}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        {/* <MenuItem disabled value="">
                            None
                          </MenuItem>
                          {group.map((v, k) => (
                            <MenuItem
                              value={v.value}
                              key={`group-type-item-${k}`}>
                              {v.label}
                            </MenuItem>
                          ))} */}
                        <FormHelperText>{helperText.group}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <LoadingButton
                      fullWidth
                      loading={loading}
                      size="large"
                      variant="contained"
                      onClick={onHandleRegister}>
                      สร้างที่พัก
                    </LoadingButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Modal>
      )}
    </>
  )
}

export default JoinBusiness
