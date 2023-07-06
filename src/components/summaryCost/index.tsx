import * as React from 'react'

import { Animation, ArgumentScale, FactoryFn } from '@devexpress/dx-react-chart'
import {
  AreaSeries,
  ArgumentAxis,
  Chart,
  Legend,
  Title,
  ValueAxis
} from '@devexpress/dx-react-chart-bootstrap4'
import { area, curveCatmullRom } from 'd3-shape'

import { scalePoint } from 'd3-scale'

const data = [
  { month: 'Jan', appStore: 101, googlePlay: 13 },
  { month: 'Feb', appStore: 89, googlePlay: 15 },
  { month: 'Mar', appStore: 107, googlePlay: 20 },
  { month: 'Apr', appStore: 113, googlePlay: 17 },
  { month: 'May', appStore: 105, googlePlay: 21 },
  { month: 'Jun', appStore: 91, googlePlay: 22 },
  { month: 'Jul', appStore: 110, googlePlay: 23 },
  { month: 'Aug', appStore: 111, googlePlay: 25 },
  { month: 'Sep', appStore: 112, googlePlay: 27 },
  { month: 'Oct', appStore: 111, googlePlay: 30 },
  { month: 'Nov', appStore: 120, googlePlay: 35 },
  { month: 'Dec', appStore: 160, googlePlay: 45 }
]

const Root = (props: any) => (
  <Legend.Root {...props} className="m-auto flex-row" />
)

const Area = (props: any) => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }: any) => arg)
      .y1(({ val }: any) => val)
      .y0(({ startVal }: any) => startVal)
      .curve(curveCatmullRom)}
  />
)

const SummaryCost = () => {
  return (
    <>
      <div className="card">
        <Chart data={data}>
          <ArgumentScale factory={scalePoint as FactoryFn} />
          <ArgumentAxis />
          <ValueAxis />

          <AreaSeries
            name="ยอดขายสุทธิ"
            valueField="appStore"
            argumentField="month"
            seriesComponent={Area}
          />
          <AreaSeries
            name="ค่าคอมมิชชั่น"
            valueField="googlePlay"
            argumentField="month"
            seriesComponent={Area}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="ข้อมูลด้านบัญชี" />
        </Chart>
      </div>
    </>
  )
}

export default SummaryCost
