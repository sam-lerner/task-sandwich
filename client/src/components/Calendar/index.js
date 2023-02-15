import React, { useState } from 'react';
// react calendar npm
import Calendar from 'react-calendar';
// styling from the react calendar npm
import 'react-calendar/dist/Calendar.css';

import "./style.css";

function OurCalendar({ userData }) {
  // Date is a built-in object
  const [date, setDate] = useState(new Date());

  return (
    <div className='app react-calendar-outmost-div'>
      <h1 className='text-center calendar-title'>React Calendar</h1>
      <div className='calendar-container'>
      {/* setDate stores a date, which is what the user clicks */}
      {/* the current date is the initial value */}
        <Calendar onChange={setDate} value={date} className="calendar-card" />
      </div>
      <p className='text-center calendar-selected-date-text'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default OurCalendar;


// onChange
// When a user clicks on an item of the most detailed view, this function is called. We can receive user selection with the help of this in the following way with alert('Clicked date is: ', value)}/>

// onClickDay
// When a user clicks on a particular day, this function is called: alert('Clicked day is: ', value)}/>. Similar to onClickDay, React-Calendar also support events like onClickDecade, onClickMonth, onClickYear, onClickWeekNumber, etc.

// onViewChange
// When the user navigates from one view to another using the drill up button or by clicking a tile, this function is called. This gives us the reason for view change and can be one of the following values: prev, prev2, next, next2, drillUp, drillDown, and onChange. Here’s an example: alert('New view is: ', view)}/>.