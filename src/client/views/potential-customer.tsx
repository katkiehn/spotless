import React from "react";

const Benefits = () => {
    return (
        <div className="benefit-wrapper">
            <h1>How you can benefit from Spotless</h1>
            <div className="benefit-category ">
                <div>
                    <img className="benefit-img" src="dishes.svg" alt="" />
                </div>
                <div className="benefit-text">
                    <h4>A Plan for yourself </h4>
                    You want a clean space but feel overwhelmed by the amount of
                    tasks? You want someone to assess which tasks should be done
                    which week, while customizing it to the time you have
                    available
                </div>
            </div>
            <div className="benefit-category ">
                <div className="benefit-text">
                    <h4>A Plan for you and others </h4> Tired of being the only
                    one in your household who takes care of the grittier taks,
                    like cleaning the fridge or cleaning door handles, which don
                    nott need to be done on a weekly basis? Want to have tasks
                    randomly assigned to your household members and allow
                    everyone to have access to the plan?
                </div>
                <div>
                    <img className="benefit-img" src="windows.svg" alt="" />
                </div>
            </div>
            <div className="benefit-category ">
                <div>
                    <img className="benefit-img" src="trash.svg" alt="" />
                </div>
                <div className="benefit-text">
                    <h4>A Plan for your Cleaner </h4>
                    Want to have your cleaner spend 30 minutes each week on
                    tasks like cleaning the fridge but never know which task to
                    give them each week? Do you have different cleaners and want
                    to make communication easy?
                </div>
            </div>
        </div>
    );
};

export default Benefits;