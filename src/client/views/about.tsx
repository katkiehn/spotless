import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>
            <header>
                <Link to="/">Home</Link>
                <Link to="/benefits">Who is it for?</Link>
                <h1>SPOTLESS</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </header>
            <h1>ABOUT US</h1>
        </div>
    );
};

export default About;
