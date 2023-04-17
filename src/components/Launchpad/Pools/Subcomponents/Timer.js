import React, {useEffect, useState} from 'react'

export default function Timer({time}) {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    useEffect(() => {
        if(time){
        const temp_hours = time.split("-")[0];
        const temp_minutes = time.split("-")[1];
        const temp_seconds = time.split("-")[2];

        setHours(temp_hours);
        setMinutes(temp_minutes);
        setSeconds(temp_seconds);
        }
    }, [time])

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(interval);
                    } else {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [hours, minutes, seconds]);

  return (
    <div className='text-[#C89211] text-sm'>
        {hours?.toString().padStart(2, "0")}h :{minutes?.toString().padStart(2, "0")}m :{seconds?.toString().padStart(2, "0")}s
    </div>
  )
}
