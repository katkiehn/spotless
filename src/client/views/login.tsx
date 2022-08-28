import React, { useState } from "react";
import FormField from "../components/form-field";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // in order to show success message after resetting pw and entering code correctly
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get("msg");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
        fetch("/api/login", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = "/tasks";
                    return;
                }
                setError(
                    "Sorry, we were unable to log in to your account. Please try again!"
                );
            });
    };

    return (
        <>
            <div className="login-wrapper">
                <div className="login">
                    <img src="family-clean.svg" alt="" />
                    <h2>Nice to see you again!</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        {error && <p className="form-error">{error}</p>}
                        {/* msg from our reset page which redirected us here after successful code input */}
                        {msg === "reset-success" && (
                            <p className="form-success">
                                Your password has been reset successfully.
                                Please login!
                            </p>
                        )}

                        <FormField
                            name="email"
                            type="email"
                            id="email"
                            label="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormField
                            name="password"
                            type="password"
                            id="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="form-field">
                            <input
                                className="add-button"
                                type="submit"
                                value="Login"
                            ></input>
                        </div>
                        <div>
                            <p>
                                Not a member just yet?{" "}
                                <a href="/register">Sign up!</a>
                            </p>
                            <p>
                                Forgotten your password?{" "}
                                <a href="/reset-password">Reset Password</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
