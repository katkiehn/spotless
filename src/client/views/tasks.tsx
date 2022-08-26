// this page shows user's weekly tasks and progress

import React from "react";
import { Link } from "react-router-dom";

const Tasks = () => {
    return (
        <>
            <header>
                <Link to="">Blog</Link>
                <Link to="/plan">Customise Plan</Link>
                <h1>SPOTLESS</h1>
                <Link to="/profile">My Profile</Link>
                <Link to="">LogOut</Link>
            </header>
            <h1>SPOTLESS-Logged In</h1>;
        </>
    );
};
export default Tasks;
