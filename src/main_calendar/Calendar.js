import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './calendar.css'
import buildCalendar from './build'
import {dayStyles, beforeToday} from './styles'
import CalendarHeader from './CalendarHeader'



const Calendar = () => {

  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())

  useEffect(()=>{
    setCalendar(buildCalendar(value))
  },[value])

  



  return (
    <div className="calendar-container">
      <CalendarHeader value={value} setValue={setValue} />
      {
      calendar.map(week=> 
      <div className="calendar">
        <div className="week">
        {week.map(day=> 
        <div 
        onClick={() => !beforeToday(day) && setValue(day)}
        className={dayStyles(day, value) + " day"}>
          {day.format("D")}
        </div>)
        }</div>
      </div>)
      
      }
    </div>
  )
}

export default Calendar
