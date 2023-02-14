import React, { useState } from 'react';

// import { useQuery } from '@apollo/client';
// import { QUERY_TASKS_BY_USER } from '../../utils/queries';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const TaskList = ({ taskData }) => {

    console.log(taskData);

    const [open, setOpen] = useState({});
    // const { data, loading, error } = useQuery(QUERY_TASKS_BY_USER);
    // console.log(data);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error retrieving data</div>;
    // }


    // const dateOne = new Date(2023, 1, 13, 23, 59);

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

    function handleOpen(index) {
        setOpen({ ...open, [index]: !open[index] })
    }

    return (
        <>
            <ListGroup>
                {todo.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <Button
                            onClick={() => handleOpen(index)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            {item.taskName}
                        </Button>
                        <Collapse in={open[index]}>
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