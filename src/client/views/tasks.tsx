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

const getImage = (percentage: number): string => {
    if (percentage < 33) {
        return "progress-0.svg";
    }
    if (percentage < 66) {
        return "progress-1.svg";
    }
    if (percentage < 99) {
        return "progress-2.svg";
    }
    return "progress-3.svg";
};
const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState("");

    const progressPercentage = getProgressPercentage(tasks);

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
            <div className="image-wrapper">
                <div className="task-photo">
                    <img
                        className="progress-photo"
                        src={getImage(progressPercentage)}
                        alt=""
                    />
                </div>
            </div>
            <h2>My weekly tasks</h2>

            <div className="all-tasks">
                {progressPercentage === 100 && (
                    <p>
                        Congratulations! You've completed all tasks!
                        <br /> If you have some elbow grease left and time to
                        spare, feel free to click the button below
                    </p>
                )}
                {/* queryied for all tasks from this week to show progress, but won't show
                the descriptions of the completed tasks on the UI */}
                {tasks
                    .filter((task) => !task.completed_at)
                    .map((task) => {
                        return (
                            <div className="task" key={task.task_id}>
                                <input
                                    className="checkbox"
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
            <button
                className="add-button"
                id="task-button"
                onClick={getNewTasks}
            >
                Ready for some action!
            </button>
            <div className="progress">
                <h2>My progress</h2>
                <ProgressBar completed={progressPercentage} bgcolor="#f7b733" />
            </div>
        </>
    );
};
export default Tasks;
