import {
  Card,
  CardContent,
  Grid,
  Icon,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'

import { Settings } from '@app/apis/interface/business-register-interface'
import { useSelector } from '@app/helpers/useSelector'

type CommissionProps = {
  settings: Settings
  onChange: (settings: Settings) => void
}

const Commission: React.FC<CommissionProps> = ({ settings, onChange }) => {
  const busunessRegister = useSelector((state) => state.busunessRegister.data)

  useEffect(() => {
    if (settings.invoice_address === '') {
      onChange({
        ...settings,
        invoice_recipient: busunessRegister.address
      })
    }

    if (settings.invoice_recipient === '') {
      onChange({
        ...settings,
        invoice_recipient: ''
      })
    }
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Card>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h5">การชำระคอมมิชชั่น</Typography>
                </Grid>
                <Grid item container>
                  <Grid item sm={8} xs={12}>
                    <Typography>
                      เราจะส่งยอดเงินที่ได้จากการจองและหักค่าคอมมิชชั่นออกแล้วไปให้ท่านเป็นรายสัปดาห์
                      โดยยอดดังกล่าวจะมาจากการจองทั้งหมดในสัปดาห์ก่อนหน้า
                      นอกจากนี้ทุก ๆ
                      เดือนเราจะส่งใบแจ้งหนี้เกี่ยวกับรายการธุรกรรมข้างต้นไปให้ท่านเก็บไว้เป็นหลักฐานเช่นกัน
                    </Typography>
                  </Grid>
                  {/* <Grid item sm={8} xs={12}>
                    <Typography>
                      เปอร์เซ็นต์คอมมิชชั่น{' '}
                      <b style={{ color: 'green' }}>15%</b>
                    </Typography>
                    <Typography>
                      ค่าธุรกรรม <b style={{ color: 'green' }}>2.1%</b>
                    </Typography>
                  </Grid> */}
                </Grid>
                <Grid item>
                  <Typography>
                    ท่านต้องการให้ออกใบแจ้งหนี้ในนามของใคร (เช่น
                    ชื่อนิติบุคคล/บริษัท)?
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    value={settings.invoice_recipient}
                    onChange={(e) => {
                      onChange({
                        ...settings,
                        invoice_recipient: e.target.value
                      })
                    }}
                    sx={{ width: 500 }}></TextField>
                </Grid>
                <Grid item>
                  <Typography>ที่อยู่</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    value={settings.invoice_address}
                    onChange={(e) => {
                      onChange({
                        ...settings,
                        invoice_address: e.target.value
                      })
                    }}
                    sx={{ width: 500 }}></TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'honeydew' }}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography>สิทธิประโยชน์จากการร่วมงานกับเรา</Typography>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Icon sx={{ color: 'green' }}>task_alt</Icon>
                </Grid>
                <Grid item xs>
                  <Typography>
                    ไม่มีค่าธรรมเนียมแอบแฝง
                    มีเพียงค่าคอมมิชชั่นในอัตราเดียวกับที่ระบุไว้เท่านั้น
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Icon sx={{ color: 'green' }}>task_alt</Icon>
                </Grid>
                <Grid item xs>
                  <Typography>
                    จ่ายค่าคอมมิชชั่นเฉพาะการจองที่มีผู้เข้าพักเท่านั้น
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Icon sx={{ color: 'green' }}>task_alt</Icon>
                </Grid>
                <Grid item xs>
                  <Typography>
                    เราดูแลเรื่องการเรียกชำระเงินจากลูกค้า
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Icon sx={{ color: 'green' }}>task_alt</Icon>
                </Grid>
                <Grid item xs>
                  <Typography>
                    มีบริการให้ความช่วยเหลือทุกวันตลอด 24
                    ชั่วโมงทั้งทางโทรศัพท์และอีเมล
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Icon sx={{ color: 'green' }}>task_alt</Icon>
                </Grid>
                <Grid item xs>
                  <Typography>
                    เพิ่มยอดจองจากการปรากฏที่โดดเด่นในผลการค้นหาบนเสิร์ชเอนจิน
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Icon sx={{ color: 'green' }}>task_alt</Icon>
                </Grid>
                <Grid item xs>
                  <Typography>
                    ให้คำแนะนำแก่ที่พักและข้อมูลวิเคราะห์เพื่อเพิ่มประสิทธิภาพในการดำเนินธุรกิจ
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Icon sx={{ color: 'green' }}>task_alt</Icon>
                </Grid>
                <Grid item xs>
                  <Typography>
                    ช่วยท่านประหยัดเวลาด้วยระบบยืนยันการจองทันที
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Commission
