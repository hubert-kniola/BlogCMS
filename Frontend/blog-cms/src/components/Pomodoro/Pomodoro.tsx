import React, { useEffect, useState } from "react"
import "./style.css"

interface IPomodoro {
    premiere?: Date
}

const image = 'https://img.freepik.com/free-photo/horizontal-shot-surprised-unshaven-young-male-points-down-opens-mouth-widely-sees-something-stunning-floor-wears-stylish-shirt-isolated-white-wall-people-emotions-concept_273609-16521.jpg?w=2000';

export const Pomodoro = ({premiere}:IPomodoro) => {
    const [isFirst, setIsFirst] = useState(true);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTime, setIsTime] = useState(false);

    useEffect(() => {
      var now = new Date();
      if(!isTime)
      {
        var delta = Math.abs(premiere.getTime() - now.getTime()) / 1000;
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        var seconds = Math.floor(delta % 60);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        
      }
    }, []);

    useEffect(() => {
            let interval = setInterval(() => {
                clearInterval(interval);
                
                if(seconds === 0){
                    if(minutes > 0){
                    setMinutes(m => m-1);
                    setSeconds(59);
                }else{
                    if(hours > 0)
                    {
                        setHours(h=>h-1)
                        setMinutes(59);
                        setSeconds(59);
                    }else{
                        if(days > 0){
                            setDays((d) => d - 1);
                            setHours(23);
                            setMinutes(59);
                            setSeconds(59);
                        }
                    }
                }
            }else{
                setSeconds(s => s-1);
            }
        }
        , 1000);
    }, [seconds])

    useEffect(()=> {
        if(isFirst){
            setIsFirst(false);
        }else{
            if(days === 0 && hours === 0 && minutes === 0 && seconds === 0){
                console.log("jestem");
                setIsTime(true);
            }
        }
    },[seconds])

    return (
      <div className="pomodoro">
        <div className="pomodoro_title">
          {isTime ? <h2> Już jest </h2> : <h2> Już wkrótce </h2>}
          <p>
            O dwóch takich co spalili indexy - czyli jak przeżyć studia na
            Politechnice
            <br />- poradnik studenta{" "}
          </p>
          {!isTime && <h1>20.11.2022 Premiera nowego postu </h1> }
        </div>
        <div className="pomodoro_time">
          {isTime ? (
            <div
              className="pomodoro_isTime"
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : (
            <div>
              {days} dni {hours} h {minutes} min {seconds} s
            </div>
          )}
        </div>
      </div>
    );
}