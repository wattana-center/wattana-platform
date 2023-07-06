import AddressInfo from './AddressInfo'
import CommonInfo from './ComminInfo'
import ContactInfo from './ContactInfo'
import { Stack } from '@mui/material'

const JoinInfo: React.FC = () => {
  return (
    <>
      <Stack direction="column" spacing={2}>
        <CommonInfo />
        <ContactInfo />
        <AddressInfo />
      </Stack>
    </>
  )
}

export default JoinInfo
