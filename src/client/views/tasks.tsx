// this page shows user's weekly tasks and progress

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Task } from "../types";
const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState("");

    const updateTask = (task: Task) => {
        // if completed at is truthy, updating it means "incompleting" it, otherwise the onchange will mark it as completed
        const endpoint = task.completed_at
            ? "/api/tasks/incompleted"
            : "/api/tasks/completed";

        fetch(endpoint, {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ task_id: task.task_id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTasks((existingTasks) =>
                        existingTasks.map((existingTask) => {
                            if (existingTask.task_id === data.task.task_id) {
                                return data.task;
                            }
                            return existingTask;
                        })
                    );
                    return;
                }
                setError(
                    "Sorry, we were unable to complete the task. Please try again!"
                );
            });
    };

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
                            <input
                                type="checkbox"
                                defaultChecked={!!task.completed_at}
                                id={`task-${task.task_id}`}
                                onChange={() => updateTask(task)}
                            />
                            <label
                                className="task-tick"
                                htmlFor={`task-${task.task_id}`}
                            >
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
