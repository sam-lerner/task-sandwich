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
        <>
            <ListGroup>
                <div class="accordion" id="accordionExample">
                    {todo.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            {item.taskName}
                                        </button>

                                    </h2>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <p>Due: {item.dueDateText}</p>
                                        <p>{item.taskDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </div>
            </ListGroup>

        </>
    );
}

export default TaskList;