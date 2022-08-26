// this is the homepage before we register or login

import React from "react";

const Homepage = () => {
    return (
        <>
            <div className="homepage-wrapper">
                <header>
                    <a href="">About</a>
                    <a href="">Who is it for?</a>
                    <h1>SPOTLESS</h1>
                    <a href="/login">Login</a>
                    <a href="">Register</a>
                </header>
                <div className="background-image"></div>
            </div>
            <h2>How we have helped people</h2>
            <div className="review-wrapper">
                <div className="reviews">
                    <p>⭐⭐⭐⭐ Such a life saver!</p>
                    <p>
                        Spotless has made my life so much easier. One thing less
                        I have to manage in my busy life. And I love their
                        minimalistic, clean UI.
                    </p>
                </div>
                <div className="reviews">
                    <p>⭐⭐⭐ Better than being told off by your partner!</p>
                    <p>
                        I am still not a fan of cleaning, but I prefer to have
                        an app tell me what to do.Since using Spotless, my
                        partner and I have had less arguments. 3 stars because
                        cleaning is still a bore.
                    </p>
                </div>
                <div className="reviews">
                    <p>⭐⭐⭐⭐⭐ Love this cleaning manager!</p>
                    <p>
                        I have a cleaner who comes regularly. Now, instead of
                        having to think of what extra tasks they could do for
                        half an hour each week, I just gave them access to my
                        customised Spotless Plan.
                    </p>
                </div>
            </div>
            <h2>Cleaning Hacks</h2>
            <h3>
                Spotless wants you to spend less time on cleaning and have more
                time for the fun stuff in life! Improve your cleaning with
                throughly tested cleaning hacks by experts and other members of
                our community.
            </h3>
        </>
    );
};
export default Homepage;
