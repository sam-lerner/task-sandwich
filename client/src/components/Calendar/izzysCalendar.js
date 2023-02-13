import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './style.css';

const Calendar = () => {

    // calendar variables
    const currentDate = dayjs();
    const dateDisplay = currentDate.format('MMMM D, YYYY')
    const [today, setToday] = useState(dayjs());
    const [currentMonth, setCurrentMonth] = useState(today.format('MMMM'));
    const [calendarBody, setCalendarBody] = useState([]);

    let events = [];

    // rerun {generateCalendar} when {today} changes
    // useEffect(callback,[dependencies]) - without the dependency it keeps rendering the page
    useEffect(() => {
        generateCalendar(today);
    }, [today]);

    function generateCalendar(date) {
        const firstDate = dayjs(date).startOf('month');
        const lastDate = dayjs(date).endOf('month');
        // .day: days of the week - what day is first day of the month in number
        let startDay = firstDate.day();
        // .date: days of the month - what day is last day of the month in number
        let daysInMonth = lastDate.date();

        // starting from the 1st day of the month
        let dateCounter = 1;
        let rows = [];

        while (dateCounter <= daysInMonth) {
            let cells = [];
            for (let i = 0; i < 7; i++) {
                // creates empty spots of first week. startDay starts from the beginning of the week and counts down to the first day of the month.
                if (startDay > 0) {
                    cells.push(<td key={`${i}-${startDay}`}></td>);
                    startDay--;
                    // creates the rest of the month
                    // adds to dateCounter at the end. if dateCounter is less than total days of the month, continue
                } else if (dateCounter <= daysInMonth) {
                    // !!! currently no events
                    const event = events.find(
                        (e) => e.date.date() === dateCounter && e.date.month() === date.month()
                    );
                    cells.push(
                        <td key={`${i}-${dateCounter}`} data-date={dateCounter}>
                            {event ? event.event : dateCounter}
                        </td>
                    );
                    dateCounter++;
                }
            }
            rows.push(<tr key={rows.length}>{cells}</tr>);
        }
        setCalendarBody(rows);
    }

    // function changeMonth() {
    //     let currentMonth = 
    // }

    function handlePreviousClick() {
        setToday(today.subtract(1, "month"));
        // use a parent to keep track of the number
        setCurrentMonth(today.format('MMMM'));
        generateCalendar(today);
    }

    function handleNextClick() {
        setToday(today.add(1, "month"));
        setCurrentMonth(today.format('MMMM'));
        generateCalendar(today);
    }

    return (
        <>
            <h3 id="dateDisplay"> {dateDisplay} </h3>
            <div id="calendar">
                <div id="calendarHeader">
                    {/* &lt; = less than symbol */}
                    {/* <button onClick={() => previous()} id="previous">&lt;</button> */}
                    <button onClick={handlePreviousClick}>&lt;</button>
                    <h3 id="currentMonth">{currentMonth}</h3>
                    {/* &gt; = greater than symbol */}
                    <button onClick={handleNextClick}>&gt;</button>
                </div>
                <table>
                    {/* thead: table head */}
                    <thead>
                        {/* tr: table row */}
                        <tr>
                            {/* th: table header (used instead of td because th is automatically centered and bold) */}
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    {/* tbody: thread body */}
                    <tbody id="calendarBody">
                        {calendarBody}
                    </tbody>
                </table>
            </div>
        </>
    )

};

export default Calendar;