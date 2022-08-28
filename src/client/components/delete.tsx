import React, { useState } from "react";

const Delete = () => {
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const triggerDelete = () => {
        fetch("/api/users/me", { method: "delete" }).then((res) => {
            if (res.status === 201) {
                window.location.href = "/account-deleted";
                return;
            }
            setError(
                "We are sorry, but we were unable to delete your account. Please try again."
            );
        });
    };

    return (
        <div>
            {showModal && (
                <div className="modal-wrapper">
                    <div className="delete-modal">
                        <img src="mopping.svg" alt="" />
                        <h2>
                            People who delete their accounts are proven to be
                            20% messier. Are you emotionally ready to embrace
                            the chaos?
                        </h2>
                        <p>
                            Account deletion is permanent and can not be
                            reversed!
                        </p>
                        <button
                            id="embrace-chaos"
                            className="add-button"
                            onClick={triggerDelete}
                        >
                            Delete my account
                        </button>
                        <button
                            id="crush-chaos"
                            className="add-button"
                            onClick={() => setShowModal(false)}
                        >
                            Keep my account
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="form-error">{error}</p>}
            <button
                className="add-button"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Delete my account
            </button>
        </div>
    );
};

export default Delete;
