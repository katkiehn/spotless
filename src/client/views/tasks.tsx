// this page shows user's weekly tasks and progress

import React from "react";
import { Link } from "react-router-dom";

const Tasks = () => {
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
                <div className="task">
                    <input type="checkbox"></input>
                    <label className="task-tick"> Task1 </label>
                </div>
                <div className="task">
                    <input type="checkbox"></input>
                    <label className="task-tick"> Task1 </label>
                </div>
                <div className="task">
                    <input type="checkbox"></input>
                    <label className="task-tick"> Task1 </label>
                </div>
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
