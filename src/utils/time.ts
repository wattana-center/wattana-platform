const dateZeroTime = () => {
  const currentDate = new Date()
  currentDate.setHours(0)
  currentDate.setMinutes(0)
  currentDate.setSeconds(0)
  currentDate.setMilliseconds(0)

  return currentDate
}

const dateMaxTime = () => {
  const currentDate = new Date()
  currentDate.setHours(23)
  currentDate.setMinutes(59)
  currentDate.setSeconds(59)
  currentDate.setMilliseconds(255)

  return currentDate
}

const formatAMPM = (date: Date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  // const ampm = hours >= 12 ? 'pm' : 'am'
  // hours = hours % 12
  // hours = hours ? hours : 12 // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutesStr
  return strTime
}

const convertStringToTime = (time: string) => {
  const date = new Date()
  const splitTime = time.split(':')

  if (splitTime[0]) {
    date.setHours(parseInt(splitTime[0]))
  }

  if (splitTime[1]) {
    date.setMinutes(parseInt(splitTime[1]))
  }

  return date
}

export { dateZeroTime, dateMaxTime, formatAMPM, convertStringToTime }
