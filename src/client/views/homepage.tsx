// this is the homepage before we register or login

import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <>
            <div className="homepage-wrapper">
                <header>
                    <Link to="">About</Link>
                    <Link to="/benefits">Who is it for?</Link>
                    <h1>SPOTLESS</h1>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
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
            <div className="blog">
                <div className="blog-paragraph">
                    Spotless wants you to spend less time on cleaning and have
                    more time for the fun stuff in life! Improve your cleaning
                    with throughly tested cleaning hacks by experts and other
                    members of our community.
                </div>
                <div className="blog-post">
                    <h4>Vinegar is life</h4>
                    Cleaning vinegar is a natural ingredient that can be used to
                    clean many items and surfaces around the house. While there
                    are many types of vinegar used for cooking and salad
                    dressings (red, white, champagne, balsamic, rice, apple
                    cider, to name a few), cleaning vinegar is an entirely
                    different product that's made specifically for household
                    cleaning and should never be consumed. If you would like to
                    move away from commercial cleaning products filled with
                    chemicals, then consider this as an alternative. Here's
                    everything you need to know about cleaning vinegar and how
                    to use it all over the house—plus a few items you should
                    never clean with vinegar.
                </div>
                <div className="blog-post">
                    <h4>
                        Mix baking soda, citric acid, and a little bit of dish
                        soap together to clean your toilets by just dropping in
                        a little pod.
                    </h4>
                    cup of baking soda + 1/4 cup of citric acid + 1 tablespoon
                    dish soap = easy toilet fizzies. Just mix everything
                    together and press into an ice cube tray, or get the full
                    tutorial from Nifty. Or you could opt for a toilet cleaner
                    that Whole Foods qualifies as "green" on their Eco-Scale,
                    based on its ingredients and it comes in a recyclable
                    bottle.
                </div>
            </div>
        </>
    );
};
export default Homepage;
