import React, { useEffect, useState } from 'react';
import "./Time.css"
import { ProgressBar } from 'react-bootstrap';
function Time() {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  },)
  return (
    <div className='d-center w-100 h-100'>
      <div className="time d-center w-100 h-100 flex-column font-Neue fw-bold">
        <div className="hours w-100 h-100 d-center align-items-end">
          {(new Date(time)).getHours()}
        </div>
        <div className="minutes w-100 h-100 d-center align-items-start">
          {(new Date(time)).getMinutes()}

        </div>
        <div className="bottom-0 w-100 mx-3" style={{height:'1em'}}>
          <ProgressBar now={(new Date(time)).getSeconds() / 60 * 100} />
        </div>
      </div>
    </div>
  )
}

export default Time