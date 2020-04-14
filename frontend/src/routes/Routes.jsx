import React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { Videos } from "./Videos/Videos";

export const Routes = () => <Switch>
    <Route path="/" exact>
        <Dashboard />
    </Route>
    <Route path="/videos">
        <Videos />
    </Route>
</Switch>;
