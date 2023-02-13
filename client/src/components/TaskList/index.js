import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const TaskList = () => {

    const dateOne = new Date(2023, 1, 13, 23, 59);

    const todo = [
        {
            taskName: "reach mvp",
            dueDateText: "February 13, 2023 23:59",
            dueDateValue: "new Date(2023, 1, 13, 23, 59)",
            taskDescription: "have at least these...."
        },
        {
            taskName: "add more stuff",
            dueDateText: "February 14, 2023 23:59",
            dueDateValue: "new Date(2023, 1, 14, 23, 59)",
            taskDescription: "fun stuff"
        },
        {
            taskName: "presentation",
            dueDateText: "February 17, 2023 15:00",
            dueDateValue: "new Date(2023, 1, 17, 10)",
            taskDescription: "you got this!"
        },
    ];
    // form for finaldate - all numerical - new Date(year,month,day,hours,minutes,seconds,ms)

    return (
        <ListGroup>
            {todo.map(item => (
                <ListGroup.Item>
                    <h3>{item.taskName}</h3>
                    <p>Due: {item.dueDateText}</p>
                    <p>{item.taskDescription}</p>
                </ListGroup.Item>
            ))}

        </ListGroup>
    );
}

export default TaskList;