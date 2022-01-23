import React from "react";
import {Switch, Route} from 'react-router-dom'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";

const App = () => {
    return(
        <>
        <Header/>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
        </Switch>
        </>
    )
};

export default App;
