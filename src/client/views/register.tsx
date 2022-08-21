import React, { useState } from "react";
import FormField from "../components/form-field";
import { Link } from "react-router-dom";

const Register = () => {
    // we call the useState hook and provide an empty string as the initial state value. The hook gives us an array- the first item is  our state value,
    // the second item is a function that allows us to update our state value

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch("/api/register", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // browser window function that refreshes the page
                    location.reload();
                    return;
                }
                setError(
                    "Sorry, we were unable to create your account. Please try again!"
                );
            });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3>Come have a coffee with us!</h3>
            {error && <p className="form-error">{error}</p>}
            <FormField
                name="name"
                type="text"
                id="name"
                label=" Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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
                <input type="submit" value="Register"></input>
            </div>
            <p>
                Already a member? <Link to="/login">Log in!</Link>
            </p>
        </form>
    );
};

export default Register;
