import React from 'react';
import dayjs from 'dayjs';
import './style.css';

// calendar variables
let today = dayjs();
let currentMonth
// const calendar = document.querySelector("#calendar");
let dateDisplay
let calendarBody


// calendar event form
// const eventForm = document.querySelector("#event");
// const eventDate = document.querySelector("#eventDate");
// const addEventButton = document.querySelector("#addEvent");

let events = [];

function init() {
    dateDisplay = today.format('MMMM D, YYYY')
    currentMonth = today.format('MMMM')
    generateCalendar(today);
}

function generateCalendar(date) {
    calendarBody = "";
    const firstDate = dayjs(date).startOf('month');
    const lastDate = dayjs(date).endOf('month');
    // .day: days of the week
    let startDay = firstDate.day();
    // .date: days of the month
    let daysInMonth = lastDate.date();

    let dateCounter = 1;
    let rows = "";
    while (dateCounter <= daysInMonth) {
        let cells = "";
        for (let i = 0; i < 7; i++) {
            if (startDay > 0) {
                cells += "<td></td>";
                startDay--;
            } else if (dateCounter <= daysInMonth) {
                const event = events.find(e => e.date.date() === dateCounter && e.date.month() === date.month());
                cells += `<td data-date="${dateCounter}">${event ? event.event : dateCounter}</td>`;
                dateCounter++;
            }
        }
        rows += `<tr>${cells}</tr>`;
    }

    calendarBody = rows;
}


function previous () {
    today = today.subtract(1, "month");
    currentMonth = today.format('MMMM');
    generateCalendar(today);
}

// previous.addEventListener("click", () => {
//     today = today.subtract(1, "month");
//     currentMonth.textContent = today.format('MMMM');
//     generateCalendar(today);
// });

function next () {
    today = today.add(1, "month");
    currentMonth.textContent = today.format('MMMM');
    generateCalendar(today);
}

// next.addEventListener("click", () => {
//     today = today.add(1, "month");
//     currentMonth.textContent = today.format('MMMM');
//     generateCalendar(today);
// });

// addEventButton.addEventListener("click", () => {
//     const event = eventForm.value;
//     const date = new Date(eventDate.value);

//     events.push({ event, date });
//     generateCalendar(today);
// });

init();

const Profile = () => {

return (
    <>
<div id="calendar">
        <h3 id="dateDisplay"> {dateDisplay} </h3>
        <div id="calendarHeader">
            {/* &lt; = less than symbol */}
            <button onClick={() => previous()} id="previous">&lt;</button>
            <h3 id="currentMonth">{currentMonth}</h3>
            {/* &gt; = greater than symbol */}
            <button onClick={() => next()} id="next">&gt;</button>
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
                {/* td: table data */}
                {/* <td> tags are imported through javascript */}
                {calendarBody}
            </tbody>
        </table>
    </div>
    {/* <form id="eventForm">
        <input type="text" id="event" placeholder="Event">
        <input type="date" id="eventDate">
        <button id="addEvent">Add Event</button>
    </form> */}
    <script src="index.js"></script>
    
    </>
)

};

export default Profile;