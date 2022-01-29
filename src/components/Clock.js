import { useEffect, useState } from 'react'

const Clock = () => {
  const [clock, setClock] = useState()

  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      let hour = date.getHours()
      const minute = date.getMinutes()
      let meridiem = 'AM'
      if (hour > 12) {
        hour -= 12
        meridiem = 'PM'
      }

      setClock(`${hour}:${minute} ${meridiem}`)
    }, 1000)
  }, [])

  return(
    <div id='clock'>
      <h1>{clock}</h1>
    </div>
  )
}

export default Clock