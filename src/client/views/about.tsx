import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="about-wrapper">
            <div className="about">
                <h1>ABOUT US</h1>
                <p>
                    Like most people we don't love to clean. But we do feel
                    better in a clean, tidy home! The need for a better system
                    became more urgent once we welcomed a furry friend into our
                    lives . Weekly tasks like vacuuming turned into a daily
                    thing. And our motivation to do anything beyond the most
                    urgent tasks evaporated.
                </p>
                <p>
                    Unfortunately, they need attention too. But we neither
                    wanted to spend our valuable brain power on coming up with
                    which - less urgent, but still necessary - tasks to tackle
                    when, nor did we want to tell each other what to do as this
                    always led to arguments. So we programmed a system to do
                    that part for us.
                </p>
                <div className="about-img">
                    <img src="dusting.svg" alt="" />
                </div>
                <p>
                    It worked so well for us that we wanted to share it with the
                    world. Try it for free, let us know how you like it and what
                    we can improve. Make sure to check our blog with helpful
                    cleaning hacks!
                </p>
            </div>
        </div>
    );
};

export default About;
