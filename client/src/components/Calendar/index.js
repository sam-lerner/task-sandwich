import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './style.css';

const Calendar = () => {

    // calendar variables
    const currentDate = dayjs();
    const dateDisplay = currentDate.format('MMMM D, YYYY')
    const [today, setToday] = useState(dayjs());
    const [currentMonth, setCurrentMonth] = useState(today.format('MMMM'));
    const [calendarBody, setCalendarBody] = useState('');

    // calendar event form
    // const eventForm = document.querySelector("#event");
    // const [event, setEvent ] = useState("";)
    // const eventDate = document.querySelector("#eventDate");
    // const addEventButton = document.querySelector("#addEvent");

    let events = [];

    // rerun {generateCalendar} when {today} changes
    useEffect(() => {
        generateCalendar(today);
    });

    function generateCalendar(date) {
        const firstDate = dayjs(date).startOf('month');
        const lastDate = dayjs(date).endOf('month');
        // .day: days of the week - what day is first day of the month in number
        let startDay = firstDate.day();
        // .date: days of the month - what day is last day of the month in number
        let daysInMonth = lastDate.date();

        // starting from the 1st day of the month
        let dateCounter = 1;
        let rows = "";

        while (dateCounter <= daysInMonth) {
            let cells = "";
            for (let i = 0; i < 7; i++) {
                // creates empty spots of first week. startDay starts from the beginning of the week and counts down to the first day of the month.
                if (startDay > 0) {
                    cells += "<td></td>";
                    startDay--;
                    // creates the rest of the month
                    // adds to dateCounter at the end. if dateCounter is less than total days of the month, continue
                } else if (dateCounter <= daysInMonth) {
                    // !!! currently no events
                    const event = events.find(e => e.date.date() === dateCounter && e.date.month() === date.month());
                    cells += `<td data-date="${dateCounter}">${event ? event.event : dateCounter}</td>`;
                    dateCounter++;
                }
            }
            rows += `<tr>${cells}</tr>`;
        }
        setCalendarBody(rows);
    }

    function previous() {
        setToday(today.subtract(1, "month"));
        setCurrentMonth(today.format('MMMM'));
        generateCalendar(today);
    }

    function next() {
        setToday(today.add(1, "month"));
        setCurrentMonth(today.format('MMMM'));
        generateCalendar(today);
    }

    // addEventButton.addEventListener("click", () => {
    //     const event = eventForm.value;
    //     const date = new Date(eventDate.value);
    //     events.push({ event, date });
    //     generateCalendar(today);
    // });

    return (
        <>
            <h3 id="dateDisplay"> {dateDisplay} </h3>
            <div id="calendar">
                <div id="calendarHeader">
                    {/* &lt; = less than symbol */}
                    {/* <button onClick={() => previous()} id="previous">&lt;</button> */}
                    <button onClick={previous}>&lt;</button>
                    <h3 id="currentMonth">{currentMonth}</h3>
                    {/* &gt; = greater than symbol */}
                    <button onClick={next}>&gt;</button>
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
                    <tbody id="calendarBody" dangerouslySetInnerHTML={{ __html: calendarBody }}></tbody>
                    {/* <tbody id="calendarBody">
                        {calendarBody}
                    </tbody> */}
                </table>
            </div>
            {/* <form id="eventForm">
        <input type="text" id="event" placeholder="Event">
        <input type="date" id="eventDate">
        <button id="addEvent">Add Event</button>
    </form> */}
        </>
    )

};

export default Calendar;