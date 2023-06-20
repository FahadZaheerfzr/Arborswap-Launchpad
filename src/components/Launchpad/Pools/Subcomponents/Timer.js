import React, { useEffect, useState } from "react";

export default function Timer({ date }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateTime = setInterval(() => {
      const time = date - Date.parse(new Date());
      if (time < 0) {
        clearInterval(updateTime);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);

    return () => clearInterval(updateTime);
  }, [date]);

  return (
    <div className="text-[#C89211] text-sm">
      {days?.toString().padStart(2, "0")}d :
      {hours?.toString().padStart(2, "0")}h :
      {minutes?.toString().padStart(2, "0")}m :
      {seconds?.toString().padStart(2, "0")}s
    </div>
  );
}
