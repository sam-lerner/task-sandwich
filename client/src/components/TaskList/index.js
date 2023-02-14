import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const TaskList = ({ taskData }) => {

    const [open, setOpen] = useState(false);
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
        <>
            <ListGroup>
                {taskData.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            {item.taskName}
                        </Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                {item.taskDescription}
                            </div>
                        </Collapse>

                    </ListGroup.Item>
                ))}
            </ListGroup>

        </>
    );
}

export default TaskList;