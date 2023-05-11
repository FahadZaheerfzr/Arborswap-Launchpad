import React, { useEffect, useState } from "react";

export default function Timer({ date }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateTime = setInterval(() => {
      const time = date - Date.parse(new Date());
      if (time < 0) {
        clearInterval(updateTime);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);

    return () => clearInterval(updateTime);
  }, [date]);

  return (
    <div className="text-[#C89211] text-sm">
      {hours?.toString().padStart(2, "0")}h :
      {minutes?.toString().padStart(2, "0")}m :
      {seconds?.toString().padStart(2, "0")}s
    </div>
  );
}
