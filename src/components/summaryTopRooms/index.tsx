import { Animation, Stack } from '@devexpress/dx-react-chart'
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Legend,
  Title,
  ValueAxis
} from '@devexpress/dx-react-chart-bootstrap4'

import { Card } from '@mui/material'
import React from 'react'

export const olimpicMedals = [
  {
    name: 'ห้องพัก',
    january: 36,
    february: 38,
    march: 36,
    april: 20,
    may: 15,
    june: 9
  },
  {
    name: 'ห้องพักเตียงคู่',
    january: 30,
    february: 27,
    march: 20,
    april: 6,
    may: 8,
    june: 31
  },
  {
    name: 'ห้องพักเตียงใหญ่',
    january: 9,
    february: 12,
    march: 16,
    april: 14,
    may: 5,
    june: 9
  },
  {
    name: 'ห้องพักดีลัก',
    january: 6,
    february: 9,
    march: 5,
    april: 2,
    may: 3,
    june: 7
  },

  {
    name: 'ห้องพัก อื่นๆ',
    january: 3,
    february: 5,
    march: 8,
    april: 15,
    may: 18,
    june: 21
  }
]

const Root = (props: any) => (
  <Legend.Root {...props} className="m-auto flex-row" />
)

const SummaryTopRooms = () => {
  const AxisLabel: React.FC<ArgumentAxis.LabelProps> = (props) => {
    const { text, x, y } = props
    const slip = (text as string).split(' ')
    return (
      <>
        {slip.map((k, i) => (
          <ArgumentAxis.Label
            {...props}
            key={i}
            text={k}
            x={x}
            y={y + (20 * i + 1)}
          />
        ))}

        {/* <ArgumentAxis.Label {...props} /> */}
      </>
    )
  }
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Chart data={olimpicMedals}>
          <ArgumentAxis labelComponent={AxisLabel} showTicks={false} />
          <ValueAxis />

          <BarSeries
            name="January"
            valueField="january"
            argumentField="name"
            color="#5984AC"
          />
          <BarSeries
            name="February"
            valueField="february"
            argumentField="name"
            color="#96bdd8"
          />
          <BarSeries
            name="March"
            valueField="march"
            argumentField="name"
            color="#FBD392"
          />
          <BarSeries
            name="April"
            valueField="april"
            argumentField="name"
            color="#F29EAA"
          />
          <BarSeries
            name="May"
            valueField="may"
            argumentField="name"
            color="#7CB267"
          />
          <BarSeries
            name="June"
            valueField="june"
            argumentField="name"
            color="#F57F3A"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} />
          <Title text="ยอดจองล่วงหน้า" />
          <Stack />
        </Chart>
      </Card>
    </>
  )
}

export default SummaryTopRooms
