// this page shows user's weekly tasks and progress

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Task } from "../types";
import ProgressBar from "../components/progress-bar";

const getProgressPercentage = (tasks: Task[]): number => {
    if (tasks.length === 0) {
        return 0;
    }
    const completedTasks = tasks.filter((task) => task.completed_at);
    return Math.floor((completedTasks.length / tasks.length) * 100);
};

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

    const getNewTasks = () => {
        fetch("/api/tasks", {
            method: "post",
            headers: { "content-type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTasks((existingTasks) => {
                        return [...existingTasks, ...data.tasks];
                    });
                    return;
                }
                setError("Sorry, we were to get new tasks. Please try again!");
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
                {/* queryied for all tasks from this week to show progress, but won't show
                the descriptions of the completed tasks on the UI */}
                {tasks
                    .filter((task) => !task.completed_at)
                    .map((task) => {
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
            <button className="task-button" onClick={getNewTasks}>
                Ready for some action!
            </button>
            <h2>My progress</h2>
            <ProgressBar
                completed={getProgressPercentage(tasks)}
                bgcolor="#f7b733"
            />
        </>
    );
};
export default Tasks;
