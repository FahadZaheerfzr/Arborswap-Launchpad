import { useEffect, useState } from 'react'

const Timer = ({ date }) => {
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)

  let countDownDate = new Date(date)

  useEffect(() => {
    var updateTime = setInterval(() => {
      var now = new Date().getTime()

      var difference = countDownDate - now
      var newMonths = Math.floor(difference / (1000 * 60 * 60 * 24 * 30))
      var newDays = Math.floor(difference / (1000 * 60 * 60 * 24))

      if (newMonths > 0) {
        newDays = newDays % 30
      }

      setMonths(newMonths)
      setDays(newDays)

      if (difference <= 0) {
        clearInterval(updateTime)
        setMonths(0)
        setDays(0)
      }
    })

    return () => {
      clearInterval(updateTime)
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between text-gray dark:text-gray-dark font-bold ">
        <span>{months.toString().padStart(2, '0')}</span>

        <span className="mx-[14px]">:</span>
        <span>{days}</span>
      </div>
      <div className="flex justify-between gap-5">
        <span className="text-dim-text dark:text-dim-text-dark text-[10px] font-medium">Months</span>
        <span className="text-dim-text dark:text-dim-text-dark text-[10px] font-medium">Days</span>
      </div>
    </div>
  )
}

export default Timer
