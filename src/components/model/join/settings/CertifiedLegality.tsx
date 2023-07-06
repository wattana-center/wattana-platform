import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from '@mui/material'

import React from 'react'
import { Settings } from '@app/apis/interface/business-register-interface'

type CertifiedLegalityProps = {
  settings: Settings
  onChange: (settings: Settings) => void
}

const CertifiedLegality: React.FC<CertifiedLegalityProps> = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Card>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h5">
                    ใกล้เสร็จเรียบร้อยแล้ว เหลืออีกไม่กี่สิ่งที่ต้องพิจารณา
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    การเปิดให้ลูกค้าจองที่พัก
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    เพื่อช่วยให้ท่านเริ่มรับรายได้
                    เราจึงได้ปรับสถานะที่พักของท่านโดยอัตโนมัติให้เปิดรับการจองในช่วง
                    18 เดือนนับจากนี้
                    หากท่านต้องการปรับเปลี่ยนจำนวนห้องว่างที่เปิดให้จองก่อนที่จะเปิดรับการจอง
                    ท่านสามารถเลือก "ลงทะเบียนเสร็จสิ้นและเปิดรับการจองภายหลัง"
                    นอกจากนี้ท่านยังสามารถปรับจำนวนห้องว่างที่เปิดให้จองได้หลังเปิดรับการจองแล้ว
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    โปรดทำเครื่องหมายถูกหน้ากล่องด้านล่างเพื่อให้การลงทะเบียนของท่านเสร็จสิ้น
                  </Typography>
                </Grid>
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="ข้าพเจ้าขอรับรองว่าที่พักนี้จดทะเบียนถูกต้องตามกฎหมายธุรกิจ รวมถึงมีใบอนุญาตที่พึงมีครบถ้วนซึ่งสามารถนำมาแสดงได้ทันทีหากมีการร้องขอ"
                    />
                  </FormGroup>
                </Grid>
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Typography>
                          ฉันได้อ่าน ยอมรับ และยินยอมตาม
                          <a>ข้อกำหนดทั่วไปในการให้บริการ</a>และ
                          <a>แถลงการณ์เกี่ยวกับความเป็นส่วนตัว</a>แล้ว
                        </Typography>
                      }
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CertifiedLegality
