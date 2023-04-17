import { useEffect, useState } from 'react'
import TimerContainer from './TimerContainer'

const Timer = ({ date }) => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  let countDownDate = new Date(date)

  useEffect(() => {
    var updateTime = setInterval(() => {
      var now = new Date().getTime()

      var difference = countDownDate - now
      var newDays = Math.floor(difference / (1000 * 60 * 60 * 24))
      var newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      var newSeconds = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(newDays)
      setHours(newHours)
      setMinutes(newMinutes)
      setSeconds(newSeconds)

      if (difference <= 0) {
        clearInterval(updateTime)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    })

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
