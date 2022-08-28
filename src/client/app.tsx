import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./views/homepage";
import UserPage from "./views/tasks";
import Register from "./views/register";
import Login from "./views/login";
import Plan from "./views/plan";
import Benefits from "./views/potential-customer";
import About from "./views/about";
import Account from "./views/account";
import Tasks from "./views/tasks";
import { Link } from "react-router-dom";
import ResetPassword from "./components/reset-password";
import PageNotFound from "./views/page-not-found";
import DeletedAccount from "./views/account-deleted";

// ---------------------------------------------------------------Routers----------------------
const NotLoggedInRouter = () => {
    return (
        <>
            <BrowserRouter>
                <header>
                    <Link to="/about">About</Link>
                    <Link to="/benefits">Who is it for?</Link>
                    <Link to="/">
                        <h1>SPOTLESS</h1>
                    </Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </header>
                <Switch>
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
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route path="/reset-password">
                        <ResetPassword />
                    </Route>
                    <Route exact path="/tasks">
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/account-deleted">
                        <DeletedAccount />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};

const LoggedInRouter = () => {
    return (
        <>
            <BrowserRouter>
                <header>
                    <Link to="/tasks">My Tasks</Link>
                    <Link to="/plan">Customise my Plan</Link>
                    <Link to="/">
                        <h1>SPOTLESS</h1>
                    </Link>
                    <Link to="/account"> My Account</Link>
                    <a href="/logout">Log Out</a>
                </header>
                <Switch>
                    <Route exact path="/tasks">
                        <Tasks />
                    </Route>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route exact path="/plan">
                        <Plan />
                    </Route>
                    <Route exact path="/account">
                        <Account />
                    </Route>
                    <Route exact path="/benefits">
                        <Benefits />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
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
