import React, { useEffect, useState } from "react";
import "./Time.css";
import { ProgressBar } from "react-bootstrap";
function Time() {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let h = new Date(time).getHours();
    h = h < 10 ? "0" + h : h;
    setHours(h);
    let m = new Date(time).getMinutes();
    m = m < 10 ? "0" + m : m;
    setMinutes(m);

    setSeconds((new Date(time).getSeconds() / 60) * 100);
  }, [time]);
  return (
    <div className="d-center w-100 h-100 flex-column user-select-none">
      <Date_Block
        time={time}
        dd={new Date(time).getDate()}
        mm={new Date(time).getMonth() + 1}
        yyyy={new Date(time).getFullYear()}
      />
      <div className="time d-center w-100 h-100 flex-column font-Neue fw-bold">
        <div className="numeric flex-grow-1 w-100 h-100 d-flex flex-md-row flex-column">
          <div className="hours w-100 h-100  d-center align-items-end align-items-md-center">
            {hours}
          </div>
          <Dot_Loader seconds={seconds} even={minutes % 2 == 0} />
          <div className="minutes w-100 h-100  d-center align-items-start align-items-md-center">
            {minutes}
          </div>
        </div>
      </div>
     <div className="w-100 my-2">

      <Day_block day={new Date(time).getDay()} />
     </div>
      <div className="w-100 my-4 px-4 d-md-none">
        <ProgressBar now={seconds} variant="dark" className="w-100 rounded-4" />
      </div>
    </div>
  );
}

export default Time;
function dig2(n) {
  return n < 10 ? "0" + n : n;
}

function Dot_this({ value }) {
  return (
    <div
      className="dot d-center border border-theme bg-transparent text-theme p-3"
      style={{ fontSize: "20px" }}
    >
      <span className="h5 m-0" style={{ fontSize: "12px" }}>
        {value}
      </span>
    </div>
  );
}
function Day_block({ day }) {
  return (
    <div className="day d-center gap-2 border border-theme bg-color text-theme fw-bold font-Neue p-2 rounded-pill px-3 mt-2 ">
      {["Su", "M", "Tu", "W", "Th", "F", "Sa"]
        .filter((e, i) => i < day)
        .map((e) => (
          <>
            <Dot_this value={e} />
          </>
        ))}
      <div className="day border bg-theme text-color rounded-pill p-2 px-3">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][day]}
      </div>
      {["Su", "M", "Tu", "W", "Th", "F", "Sa"]
        .filter((e, i) => i > day)
        .map((e) => (
          <>
            <Dot_this value={e} />
          </>
        ))}
    </div>
  );
}
function Date_Block({ time, dd, mm, yyyy }) {
  return (
    <div className="date d-center gap-2 border border-theme bg-color text-theme fw-bold font-Neue p-2 rounded-pill px-4 mt-2 ">
      &nbsp; &nbsp;
      <div className="dd">{dig2(dd)}</div>
      <div className="dot" style={{ fontSize: "10px" }}></div>
      <div className="mm">{dig2(mm)}</div>
      <div className="dot" style={{ fontSize: "10px" }}></div>
      <div className="yyyy">{yyyy}</div>
    </div>
  );
}

function Dot_Loader({ seconds, even }) {
  console.log(seconds);
  return (
    <div className="d-none d-md-flex d-center" style={{ fontSize: "50px" }}>
      <div className={"dot " + (even ? "text-theme" : "text-color")}></div>
      <div
        className={
          "dot-loader dot position-absolute  " +
          (even ? "text-color" : "text-theme")
        }
        style={{
          "--i": seconds,
        }}
      ></div>
    </div>
  );
}
