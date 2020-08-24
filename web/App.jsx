import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Header } from './components/header/headerComponent';
import "./global.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import EventCalendarScreen
    from "./components/EventCalendarScreen/eventCalendarScreen";
import {EventTableScreen} from "./components/EventTableScreen/eventTableScreen";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Header/>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/EventCalendar">
                        <EventCalendarScreen/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                    <Route path="/EventTable">
                        <EventTableScreen />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
export default hot(App);
