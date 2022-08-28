//  page where user can change their account details
import React from "react";
import { Link } from "react-router-dom";
import Delete from "../components/delete";
const Profile = () => {
    return (
        <>
            <div>
                <h4>Me</h4>
                <p>change name</p>
                <p>change email</p>
                <h4>My Home</h4>
                <p>show which rooms I have on spotless</p>
                <a href="">
                    A link to change my rooms on customise my plan page
                </a>
                <h4> My Household</h4>
                <p>
                    Here we can eventually create a household/group with several
                    people
                </p>
                <Delete />
            </div>
        </>
    );
};

export default Profile;
