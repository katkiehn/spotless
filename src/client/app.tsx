import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./views/homepage";
import UserPage from "./views/user-page";

// ---------------------------------------------------------------Routers----------------------
const NotLoggedInRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/">
                    <Homepage />
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
