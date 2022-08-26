import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./views/homepage";
import UserPage from "./views/user-page";
import Register from "./views/register";
import Login from "./views/login";
import Plan from "./views/plan";
import Benefits from "./views/potential-customer";

// ---------------------------------------------------------------Routers----------------------
const NotLoggedInRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/benefits">
                    <Benefits />
                </Route>
            </BrowserRouter>
        </>
    );
};

const LoggedInRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/">
                    <UserPage />
                </Route>
                <Route exact path="/plan">
                    <Plan />
                </Route>
            </BrowserRouter>
        </>
    );
};

// ------------------------------------------------------------React App Initialization---------------------
fetch("/api/users/me")
    .then((response) => response.json())
    .then((data) => {
        if (!data.isLoggedIn) {
            ReactDOM.render(
                <NotLoggedInRouter />,
                document.querySelector("#app")
            );
        } else {
            ReactDOM.render(
                <LoggedInRouter />,

                document.querySelector("#app")
            );
        }
    });
