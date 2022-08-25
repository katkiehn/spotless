// this is the homepage before we register or login

import React from "react";

const Homepage = () => {
    return (
        <div className="homepage-wrapper">
            <header>
                <a href="">About</a>
                <a href="">Who is it for?</a>
                <h1>SPOTLESS</h1>
                <a href="/login">Login</a>
                <a href="">Register</a>
            </header>
        </div>
    );
};
export default Homepage;
