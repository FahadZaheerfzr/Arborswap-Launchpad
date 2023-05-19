import { useEffect, useState } from 'react'
import TimerContainer from './TimerContainer'

const Timer = ({ date }) => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  // console.log(date)
  useEffect(() => {
    var updateTime = setInterval(() => {
      const time = date - Date.parse(new Date())
      const seconds = Math.floor((time / 1000) % 60)
      const minutes = Math.floor((time / 1000 / 60) % 60)
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
      const days = Math.floor(time / (1000 * 60 * 60 * 24))

      setDays(days)
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)
    }, 1000)

    return () => {
      clearInterval(updateTime)
    }
  })

  return (
    <div className="flex justify-between mt-3 px-5">
      <TimerContainer value={days} head="Days" />

      <span className="text-2xl font-bold text-gray dark:text-gray-dark">:</span>

      <TimerContainer value={hours} head="Hours" />

      <span className="text-2xl font-bold text-gray dark:text-gray-dark">:</span>

      <TimerContainer value={minutes} head="Minutes" />

      <span className="text-2xl font-bold text-gray dark:text-gray-dark">:</span>

      <TimerContainer value={seconds} head="Seconds" />
    </div>
  )
}

export default Timer
