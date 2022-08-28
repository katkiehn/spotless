import React from "react";

const ProgressBar = (props: any) => {
    const { bgcolor, completed } = props;

    const fillerStyles = {
        width: `${completed}%`,
        backgroundColor: bgcolor,
    };
    return (
        <div className="progress-container">
            <div className="progress-fill" style={fillerStyles}>
                <span className="progress-text">{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
