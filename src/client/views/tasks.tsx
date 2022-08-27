// this page shows user's weekly tasks and progress

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Task } from "../types";
const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch("/api/tasks/weekly")
            .then((res) => res.json())
            .then((data) => {
                setTasks(data.tasks);
            });
    }, []);
    return (
        <>
            <div className="task-photo">
                <img
                    src="https://media.istockphoto.com/vectors/concept-of-apathy-vector-id1347293963?b=1&k=20&m=1347293963&s=612x612&h=WUlF-mgSvwdjEvL89v3A3W3pjcbotabvWORoCZNvCqE="
                    alt=""
                />
            </div>
            <h2>My weekly tasks</h2>
            <div className="all-tasks">
                {tasks.map((task) => {
                    return (
                        <div className="task" key={task.task_id}>
                            <input type="checkbox"></input>
                            <label className="task-tick">
                                {task.description}
                            </label>
                        </div>
                    );
                })}
            </div>
            <h2>My progress</h2>
            <div className="diagram">
                <div>
                    <img className="diagram-img" src="chart_pie.svg" alt="" />
                </div>
            </div>
        </>
    );
};
export default Tasks;
