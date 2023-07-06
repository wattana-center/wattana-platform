import { Button, Stack } from '@mui/material'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import AddressInfo from './AddressInfo'
import BusinessApi from '@app/apis/business-api'
import { BusinessResponseGet } from '@app/apis/interface/business-interface'
import CommonInfo from './ComminInfo'
import ContactInfo from './ContactInfo'
import { useEffect } from 'react'
import { useState } from 'react'

type ManageInfoProps = {
  data: BusinessResponseGet
}

const ManageInfo: React.FC<ManageInfoProps> = ({ data }) => {
  const authUsers = useAuthUser()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()
  const alertError = useAlertError()

  const [info, setInfo] = useState<BusinessResponseGet>({ ...data })

  useEffect(() => {
    setInfo({ ...data })
  }, [data])

  const handleOnSummit = async () => {
    const token = await authUsers.getIdToken()

    if (token) {
      loadingAlert()
      const businessApi = new BusinessApi({ token: token })
      await businessApi
        .update(info, `${info.id}`)
        .then(() => {
          alertSuccess(`บันทึกข้อมูลเรียบร้อย`)
        })
        .catch((error) => {
          alertError(`${error.message}`)
        })
    }
  }

  const handleOnCancel = () => {
    setInfo({ ...data })
  }

  return (
    <>
      <Stack direction="column" spacing={2} style={{ marginBottom: 20 }}>
        <CommonInfo data={info} setData={setInfo} />
        <ContactInfo data={info} setData={setInfo} />
        <AddressInfo data={info} setData={setInfo} />
        <Button variant="outlined" fullWidth onClick={() => handleOnCancel()}>
          ยกเลิก
        </Button>
        <Button variant="contained" fullWidth onClick={() => handleOnSummit()}>
          บันทึก
        </Button>
      </Stack>
    </>
  )
}

export default withAuthUser<ManageInfoProps>()(ManageInfo)
