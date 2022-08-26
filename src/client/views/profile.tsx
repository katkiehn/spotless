//  page where user can change their account details
import React from "react";
import { Link } from "react-router-dom";
const Profile = () => {
    return (
        <>
            <header>
                <Link to="">Blog</Link>
                <Link to="/benefits">Who is it for?</Link>
                <h1>SPOTLESS</h1>
                <Link to="/">My Tasks</Link>
                <Link to="">LogOut</Link>
            </header>
        </>
    );
};

export default Profile;
