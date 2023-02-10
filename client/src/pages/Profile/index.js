import React from 'react';

// calendar variables
let today = dayjs();
const currentMonth = document.querySelector("#currentMonth");
const calendar = document.querySelector("#calendar");
const dateDisplay = document.querySelector("#dateDisplay");
const calendarBody = document.querySelector("#calendarBody");

//calendar buttons
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

// calendar event form
// const eventForm = document.querySelector("#event");
// const eventDate = document.querySelector("#eventDate");
// const addEventButton = document.querySelector("#addEvent");

let events = [];

function init() {
    dateDisplay.textContent = today.format('MMMM D, YYYY')
    currentMonth.textContent = today.format('MMMM')
    generateCalendar(today);
}

function generateCalendar(date) {
    calendarBody.innerHTML = "";
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

    calendarBody.innerHTML = rows;
}

previous.addEventListener("click", () => {
    today = today.subtract(1, "month");
    currentMonth.textContent = today.format('MMMM');
    generateCalendar(today);
});

next.addEventListener("click", () => {
    today = today.add(1, "month");
    currentMonth.textContent = today.format('MMMM');
    generateCalendar(today);
});

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

    </>
)

};

export default Profile;